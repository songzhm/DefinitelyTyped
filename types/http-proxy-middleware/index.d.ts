// Type definitions for http-proxy-middleware 0.17
// Project: https://github.com/chimurai/http-proxy-middleware
// Definitions by: Zebulon McCorkle <https://github.com/zebMcCorkle>
//                 BendingBender <https://github.com/BendingBender>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.2

/// <reference types="node" />

import * as http from "http";
import * as net from "net";
import * as tls from "tls";
import * as connect from "connect";
import * as httpProxy from "http-proxy";

declare function proxy(config: proxy.Config): proxy.Proxy;
declare function proxy(contextOrUri: string | string[] | proxy.Filter, config: proxy.Config): proxy.Proxy;

declare namespace proxy {
  type Filter = (pathanme: string, req: http.IncomingMessage) => boolean;
  type Logger = (...args: any[]) => void;
  interface LogProvider {
    log: Logger;
    debug?: Logger;
    info?: Logger;
    warn?: Logger;
    error?: Logger;
  }

  interface Config {
    pathRewrite?: { [regexp: string]: string } | ((path: string, req: http.IncomingMessage) => string);
    router?: { [hostOrPath: string]: string } | ((req: http.IncomingMessage) => string);
    logLevel?: 'debug' | 'info' | 'warn' | 'error' | 'silent';
    logProvider?(provider: LogProvider): LogProvider;

    onError?(err: Error, req: http.IncomingMessage, res: http.ServerResponse): void;
    onProxyRes?(proxyRes: http.IncomingMessage, req: http.IncomingMessage, res: http.ServerResponse): void;
    onProxyReq?(proxyReq: http.ClientRequest, req: http.IncomingMessage, res: http.ServerResponse): void;
    onProxyReqWs?(proxyReq: http.ClientRequest, req: http.IncomingMessage, socket: net.Socket, options: httpProxy.ServerOptions, head: any): void;
    onOpen?(proxySocket: net.Socket): void;
    onClose?(res: http.IncomingMessage, socket: net.Socket, head: any): void;

    target?: string;
    forward?: string;
    agent?: http.Agent;
    ssl?: tls.TlsServerOptions;
    ws?: boolean;
    xfwd?: boolean;
    secure?: boolean;
    toProxy?: boolean;
    prependPath?: boolean;
    ignorePath?: boolean;
    localAddress?: string;
    changeOrigin?: boolean;
    auth?: string;
    hostRewrite?: string;
    autoRewrite?: boolean;
    protocolRewrite?: string;
    cookieDomainRewrite?: false | string | { [domain: string]: string };
    headers?: { [header: string]: string };
    proxyTimeout?: number;
    /**
     * @deprecated
     */
    proxyHost?: any;
    /**
     * @deprecated
     */
    proxyTable?: any;
  }

  type Proxy = connect.NextHandleFunction;
}

export = proxy;
