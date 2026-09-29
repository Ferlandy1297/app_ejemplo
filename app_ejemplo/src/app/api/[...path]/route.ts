import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const BACKEND_API_URL = (process.env.BACKEND_API_URL || 'http://localhost:8080/api/v1').replace(
  /\/$/,
  ''
);

interface RouteContext {
  params: {
    path: string[];
  };
}

async function proxyRequest(request: NextRequest, context: RouteContext): Promise<NextResponse> {
  const requestUrl = new URL(request.url);
  const backendUrl = new URL(`${BACKEND_API_URL}/${context.params.path.join('/')}`);
  backendUrl.search = requestUrl.search;

  const headers = new Headers();
  for (const headerName of ['authorization', 'content-type', 'accept']) {
    const value = request.headers.get(headerName);
    if (value) headers.set(headerName, value);
  }

  const hasBody = !['GET', 'HEAD'].includes(request.method);

  try {
    const backendResponse = await fetch(backendUrl, {
      method: request.method,
      headers,
      body: hasBody ? await request.arrayBuffer() : undefined,
      cache: 'no-store',
      redirect: 'manual',
    });

    const responseHeaders = new Headers();
    const contentType = backendResponse.headers.get('content-type');
    if (contentType) responseHeaders.set('content-type', contentType);
    responseHeaders.set('cache-control', 'no-store');
    responseHeaders.set('x-bff-proxy', 'nextjs');

    return new NextResponse(backendResponse.body, {
      status: backendResponse.status,
      statusText: backendResponse.statusText,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error('BFF no pudo comunicarse con el backend:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'El servicio backend no está disponible',
      },
      { status: 502, headers: { 'x-bff-proxy': 'nextjs' } }
    );
  }
}

export const GET = proxyRequest;
export const POST = proxyRequest;
export const PUT = proxyRequest;
export const PATCH = proxyRequest;
export const DELETE = proxyRequest;
export const OPTIONS = proxyRequest;
