export = index;
declare function index(t: any): any;
declare namespace index {
	namespace Children {
		function count(children: any): any;
		function forEach(children: any, forEachFunc: any, forEachContext: any): any;
		function map(children: any, func: any, context: any): any;
		function only(children: any): any;
		function toArray(children: any): any;
	}
	class Component {
		constructor(...args: any[]);
		componentWillUnmount(): void;
		forceUpdate(callback: any): void;
		setGlobal(t: any, ...args: any[]): any;
		setState(partialState: any, callback: any): void;
	}
	const Fragment: symbol;
	class PureComponent {
		constructor(...args: any[]);
		componentWillUnmount(): void;
		forceUpdate(callback: any): void;
		setGlobal(t: any, ...args: any[]): any;
		setState(partialState: any, callback: any): void;
	}
	const StrictMode: symbol;
	const Suspense: symbol;
	function addCallback(t: any): any;
	function addReducer(t: any, e: any): any;
	function cloneElement(element: any, props: any, children: any, ...args: any[]): any;
	function createContext(defaultValue: any, calculateChangedBits: any): any;
	function createElement(type: any, props: any, children: any, ...args: any[]): any;
	function createFactory(type: any): any;
	function createProvider(...args: any[]): any;
	function createRef(): any;
	function forwardRef(render: any): any;
	function getGlobal(): any;
	function isValidElement(object: any): any;
	function lazy(ctor: any): any;
	function memo(type: any, compare: any): any;
	function removeCallback(t: any): any;
	function resetGlobal(): any;
	function setGlobal(t: any, ...args: any[]): any;
	const unstable_ConcurrentMode: symbol;
	const unstable_Profiler: symbol;
	function useCallback(callback: any, inputs: any): any;
	function useContext(Context: any, unstable_observedBits: any, ...args: any[]): any;
	function useDebugValue(value: any, formatterFn: any): any;
	function useEffect(create: any, inputs: any): any;
	function useGlobal(t: any, ...args: any[]): any;
	function useImperativeHandle(ref: any, create: any, inputs: any): any;
	function useLayoutEffect(create: any, inputs: any): any;
	function useMemo(create: any, inputs: any): any;
	function useReducer(reducer: any, initialArg: any, init: any): any;
	function useRef(initialValue: any): any;
	function useState(initialState: any): any;
	const version: string;
	function withGlobal(...args: any[]): any;
}
