export = index;
declare type H2MOptions = {
    converter?:any,
    overrides?:any
}
declare function index(html: string, options?: H2MOptions): string;
