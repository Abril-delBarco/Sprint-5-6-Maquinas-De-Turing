// Ejecutar con Vitest y el entorno jsdom en la aplicación React integrada.
import React from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes, useNavigate } from 'react-router-dom';
import ProductsPage from '../src/pages/ProductsPage';
import ProductDetailPage from '../src/pages/ProductDetailPage';
import { getProductById, getProducts } from '../src/services/api';

const chair = { _id: 'silla-1', nombre: 'Silla de madera', precio: 25000, stock: 2,
  descripcion: 'Madera maciza', imagenUrl: 'https://example.com/silla.jpg' };
const response = (data, status = 200) => ({ ok: status < 400, status, json: async () => data });

afterEach(() => { cleanup(); vi.unstubAllGlobals(); });

function mount(path = '/productos', extra = null) {
  return render(<MemoryRouter initialEntries={[path]}>
    {extra}
    <Routes>
      <Route path="/productos" element={<ProductsPage />} />
      <Route path="/productos/:id" element={<ProductDetailPage />} />
    </Routes>
  </MemoryRouter>);
}

describe('servicio de productos', () => {
  it('lee el catálogo y conserva el signal de cancelación', async () => {
    const fetchMock = vi.fn().mockResolvedValue(response([chair]));
    vi.stubGlobal('fetch', fetchMock);
    const signal = new AbortController().signal;
    expect(await getProducts({ signal })).toEqual([chair]);
    expect(fetchMock).toHaveBeenCalledWith(expect.stringMatching(/\/api\/productos$/), { signal });
  });

  it('codifica el ID y propaga los mensajes y estados del backend', async () => {
    const fetchMock = vi.fn().mockResolvedValue(response({ mensaje: 'Producto no encontrado' }, 404));
    vi.stubGlobal('fetch', fetchMock);
    await expect(getProductById('a/b')).rejects.toMatchObject({ status: 404, message: 'Producto no encontrado' });
    expect(fetchMock.mock.calls[0][0]).toMatch(/\/a%2Fb$/);
  });

  it('rechaza respuestas exitosas con formatos incorrectos', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(response({ inesperado: true })));
    await expect(getProducts()).rejects.toThrow('formato incorrecto');
    await expect(getProductById('1')).rejects.toThrow('formato incorrecto');
  });

  it('maneja errores no JSON y errores de red', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 502,
      json: async () => { throw new SyntaxError(); } }));
    await expect(getProducts()).rejects.toMatchObject({ status: 502 });
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new TypeError('Failed to fetch')));
    await expect(getProducts()).rejects.toMatchObject({ status: 0 });
  });

  it('conserva AbortError para las solicitudes canceladas', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new DOMException('Cancelado', 'AbortError')));
    await expect(getProducts()).rejects.toMatchObject({ name: 'AbortError' });
  });
});

describe('catálogo y detalle', () => {
  it('muestra carga, catálogo y navega al detalle', async () => {
    let resolve;
    vi.stubGlobal('fetch', vi.fn()
      .mockImplementationOnce(() => new Promise(done => { resolve = done; }))
      .mockResolvedValue(response(chair)));
    mount();
    expect(screen.getByRole('status').textContent).toContain('Cargando productos');
    resolve(response([chair]));
    fireEvent.click(await screen.findByRole('link', { name: 'Ver detalle de Silla de madera' }));
    expect(await screen.findByText('Madera maciza')).toBeTruthy();
    expect(screen.getByText('Stock disponible: 2 unidades')).toBeTruthy();
    expect(screen.getByRole('link', { name: /Volver al catálogo/ })).toBeTruthy();
  });

  it('explica cuando el catálogo está vacío', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(response([])));
    mount();
    expect(await screen.findByText(/Todavía no hay productos/)).toBeTruthy();
  });

  it('permite recuperar el catálogo después de un error', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValueOnce(new TypeError())
      .mockResolvedValue(response([chair])));
    mount();
    fireEvent.click(await screen.findByRole('button', { name: 'Reintentar' }));
    expect(await screen.findByRole('heading', { name: chair.nombre })).toBeTruthy();
  });

  it('muestra producto no encontrado para un 404', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(response({ mensaje: 'No existe' }, 404)));
    mount('/productos/inexistente');
    expect(await screen.findByRole('heading', { name: 'Producto no encontrado' })).toBeTruthy();
    expect(screen.queryByRole('button', { name: 'Reintentar' })).toBeNull();
  });

  it('permite reintentar el detalle y muestra datos opcionales ausentes', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValueOnce(new TypeError())
      .mockResolvedValue(response({ ...chair, stock: 0, descripcion: '', imagenUrl: '' })));
    mount('/productos/silla-1');
    fireEvent.click(await screen.findByRole('button', { name: 'Reintentar' }));
    expect(await screen.findByText('Sin stock por el momento')).toBeTruthy();
    expect(screen.getByText('Imagen no disponible')).toBeTruthy();
    expect(screen.getByText(/todavía no tiene una descripción/)).toBeTruthy();
  });

  it('reemplaza una imagen rota por un mensaje', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(response([chair])));
    mount();
    fireEvent.error(await screen.findByRole('img', { name: chair.nombre }));
    expect(screen.getByText('Imagen no disponible')).toBeTruthy();
  });

  it('cancela solicitudes al desmontar', async () => {
    const fetchMock = vi.fn().mockReturnValue(new Promise(() => {}));
    vi.stubGlobal('fetch', fetchMock);
    const view = mount();
    const signal = fetchMock.mock.calls[0][1].signal;
    view.unmount();
    expect(signal.aborted).toBe(true);
  });

  it('ignora una respuesta anterior cuando cambia el ID', async () => {
    let resolveOld;
    const fetchMock = vi.fn()
      .mockImplementationOnce(() => new Promise(done => { resolveOld = done; }))
      .mockResolvedValue(response({ ...chair, _id: 'mesa-2', nombre: 'Mesa nueva' }));
    vi.stubGlobal('fetch', fetchMock);
    function NextProduct() {
      const navigate = useNavigate();
      return <button onClick={() => navigate('/productos/mesa-2')}>Otro producto</button>;
    }
    mount('/productos/silla-1', <NextProduct />);
    fireEvent.click(screen.getByRole('button', { name: 'Otro producto' }));
    expect(await screen.findByRole('heading', { name: 'Mesa nueva' })).toBeTruthy();
    resolveOld(response(chair));
    await waitFor(() => expect(fetchMock.mock.calls[0][1].signal.aborted).toBe(true));
    expect(screen.queryByRole('heading', { name: chair.nombre })).toBeNull();
  });
});
