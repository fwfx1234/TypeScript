namespace ts {
    interface Range {
        pos: number;
        end: number;
        name: string;
    }

    interface Test {
        source: string;
        ranges: Map<Range>;
    }

    function getTest(source: string): Test {
        const activeRanges: Range[] = [];
        let text = "";
        let lastPos = 0;
        let pos = 0;
        const ranges = createMap<Range>();

        while (pos < source.length) {
            if (source.charCodeAt(pos) === CharacterCodes.openBracket &&
                (source.charCodeAt(pos + 1) === CharacterCodes.hash || source.charCodeAt(pos + 1) === CharacterCodes.$)) {
                const saved = pos;
                pos += 2;
                const s = pos;
                consumeIdentifier();
                const e = pos;
                if (source.charCodeAt(pos) === CharacterCodes.bar) {
                    pos++;
                    text += source.substring(lastPos, saved);
                    const name = s === e
                        ? source.charCodeAt(saved + 1) === CharacterCodes.hash ? "selection" : "extracted"
                        : source.substring(s, e);
                    activeRanges.push({ name, pos: text.length, end: undefined! });
                    lastPos = pos;
                    continue;
                }
                else {
                    pos = saved;
                }
            }
            else if (source.charCodeAt(pos) === CharacterCodes.bar && source.charCodeAt(pos + 1) === CharacterCodes.closeBracket) {
                text += source.substring(lastPos, pos);
                activeRanges[activeRanges.length - 1].end = text.length;
                const range = activeRanges.pop()!;
                if (range.name in ranges) {
                    throw new Error(`Duplicate name of range ${range.name}`);
                }
                ranges.set(range.name, range);
                pos += 2;
                lastPos = pos;
                continue;
            }
            pos++;
        }
        text += source.substring(lastPos, pos);

        function consumeIdentifier() {
            while (isIdentifierPart(source.charCodeAt(pos), ScriptTarget.Latest)) {
                pos++;
            }
        }
        return { source: text, ranges };
    }

    const libFile: TestFSWithWatch.File = {
        path: "/a/lib/lib.d.ts",
        content: `/// <reference no-default-lib="true"/>
interface Boolean {}
interface Function {}
interface IArguments {}
interface Number { toExponential: any; }
interface Object {}
declare function fetch(input?, init?): Promise<Response>;
interface Response extends Body {
    readonly headers: Headers;
    readonly ok: boolean;
    readonly redirected: boolean;
    readonly status: number;
    readonly statusText: string;
    readonly trailer: Promise<Headers>;
    readonly type: ResponseType;
    readonly url: string;
    clone(): Response;
}
interface Body {
    readonly body: ReadableStream | null;
    readonly bodyUsed: boolean;
    arrayBuffer(): Promise<ArrayBuffer>;
    blob(): Promise<Blob>;
    formData(): Promise<FormData>;
    json(): Promise<any>;
    text(): Promise<string>;
}
declare type PromiseConstructorLike = new <T>(executor: (resolve: (value?: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void) => PromiseLike<T>;
interface PromiseLike<T> {
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): PromiseLike<TResult1 | TResult2>;
}
interface Promise<T> {
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;

    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
}
interface PromiseConstructor {
    /**
     * A reference to the prototype.
     */
    readonly prototype: Promise<any>;

    /**
     * Creates a new Promise.
     * @param executor A callback used to initialize the promise. This callback is passed two arguments:
     * a resolve callback used resolve the promise with a value or the result of another promise,
     * and a reject callback used to reject the promise with a provided reason or error.
     */
    new <T>(executor: (resolve: (value?: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void): Promise<T>;

    /**
     * Creates a Promise that is resolved with an array of results when all of the provided Promises
     * resolve, or rejected when any Promise is rejected.
     * @param values An array of Promises.
     * @returns A new Promise.
     */
    all<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike <T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>, T7 | PromiseLike<T7>, T8 | PromiseLike<T8>, T9 | PromiseLike<T9>, T10 | PromiseLike<T10>]): Promise<[T1, T2, T3, T4, T5, T6, T7, T8, T9, T10]>;

    /**
     * Creates a Promise that is resolved with an array of results when all of the provided Promises
     * resolve, or rejected when any Promise is rejected.
     * @param values An array of Promises.
     * @returns A new Promise.
     */
    all<T1, T2, T3, T4, T5, T6, T7, T8, T9>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike <T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>, T7 | PromiseLike<T7>, T8 | PromiseLike<T8>, T9 | PromiseLike<T9>]): Promise<[T1, T2, T3, T4, T5, T6, T7, T8, T9]>;

    /**
     * Creates a Promise that is resolved with an array of results when all of the provided Promises
     * resolve, or rejected when any Promise is rejected.
     * @param values An array of Promises.
     * @returns A new Promise.
     */
    all<T1, T2, T3, T4, T5, T6, T7, T8>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike <T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>, T7 | PromiseLike<T7>, T8 | PromiseLike<T8>]): Promise<[T1, T2, T3, T4, T5, T6, T7, T8]>;

    /**
     * Creates a Promise that is resolved with an array of results when all of the provided Promises
     * resolve, or rejected when any Promise is rejected.
     * @param values An array of Promises.
     * @returns A new Promise.
     */
    all<T1, T2, T3, T4, T5, T6, T7>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike <T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>, T7 | PromiseLike<T7>]): Promise<[T1, T2, T3, T4, T5, T6, T7]>;

    /**
     * Creates a Promise that is resolved with an array of results when all of the provided Promises
     * resolve, or rejected when any Promise is rejected.
     * @param values An array of Promises.
     * @returns A new Promise.
     */
    all<T1, T2, T3, T4, T5, T6>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike <T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>]): Promise<[T1, T2, T3, T4, T5, T6]>;

    /**
     * Creates a Promise that is resolved with an array of results when all of the provided Promises
     * resolve, or rejected when any Promise is rejected.
     * @param values An array of Promises.
     * @returns A new Promise.
     */
    all<T1, T2, T3, T4, T5>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike <T4>, T5 | PromiseLike<T5>]): Promise<[T1, T2, T3, T4, T5]>;

    /**
     * Creates a Promise that is resolved with an array of results when all of the provided Promises
     * resolve, or rejected when any Promise is rejected.
     * @param values An array of Promises.
     * @returns A new Promise.
     */
    all<T1, T2, T3, T4>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike <T4>]): Promise<[T1, T2, T3, T4]>;

    /**
     * Creates a Promise that is resolved with an array of results when all of the provided Promises
     * resolve, or rejected when any Promise is rejected.
     * @param values An array of Promises.
     * @returns A new Promise.
     */
    all<T1, T2, T3>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>]): Promise<[T1, T2, T3]>;

    /**
     * Creates a Promise that is resolved with an array of results when all of the provided Promises
     * resolve, or rejected when any Promise is rejected.
     * @param values An array of Promises.
     * @returns A new Promise.
     */
    all<T1, T2>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>]): Promise<[T1, T2]>;

    /**
     * Creates a Promise that is resolved with an array of results when all of the provided Promises
     * resolve, or rejected when any Promise is rejected.
     * @param values An array of Promises.
     * @returns A new Promise.
     */
    all<T>(values: (T | PromiseLike<T>)[]): Promise<T[]>;

    /**
     * Creates a Promise that is resolved or rejected when any of the provided Promises are resolved
     * or rejected.
     * @param values An array of Promises.
     * @returns A new Promise.
     */
    race<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>, T7 | PromiseLike<T7>, T8 | PromiseLike<T8>, T9 | PromiseLike<T9>, T10 | PromiseLike<T10>]): Promise<T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9 | T10>;

    /**
     * Creates a Promise that is resolved or rejected when any of the provided Promises are resolved
     * or rejected.
     * @param values An array of Promises.
     * @returns A new Promise.
     */
    race<T1, T2, T3, T4, T5, T6, T7, T8, T9>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>, T7 | PromiseLike<T7>, T8 | PromiseLike<T8>, T9 | PromiseLike<T9>]): Promise<T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9>;

    /**
     * Creates a Promise that is resolved or rejected when any of the provided Promises are resolved
     * or rejected.
     * @param values An array of Promises.
     * @returns A new Promise.
     */
    race<T1, T2, T3, T4, T5, T6, T7, T8>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>, T7 | PromiseLike<T7>, T8 | PromiseLike<T8>]): Promise<T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8>;

    /**
     * Creates a Promise that is resolved or rejected when any of the provided Promises are resolved
     * or rejected.
     * @param values An array of Promises.
     * @returns A new Promise.
     */
    race<T1, T2, T3, T4, T5, T6, T7>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>, T7 | PromiseLike<T7>]): Promise<T1 | T2 | T3 | T4 | T5 | T6 | T7>;

    /**
     * Creates a Promise that is resolved or rejected when any of the provided Promises are resolved
     * or rejected.
     * @param values An array of Promises.
     * @returns A new Promise.
     */
    race<T1, T2, T3, T4, T5, T6>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>]): Promise<T1 | T2 | T3 | T4 | T5 | T6>;

    /**
     * Creates a Promise that is resolved or rejected when any of the provided Promises are resolved
     * or rejected.
     * @param values An array of Promises.
     * @returns A new Promise.
     */
    race<T1, T2, T3, T4, T5>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>]): Promise<T1 | T2 | T3 | T4 | T5>;

    /**
     * Creates a Promise that is resolved or rejected when any of the provided Promises are resolved
     * or rejected.
     * @param values An array of Promises.
     * @returns A new Promise.
     */
    race<T1, T2, T3, T4>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>]): Promise<T1 | T2 | T3 | T4>;

    /**
     * Creates a Promise that is resolved or rejected when any of the provided Promises are resolved
     * or rejected.
     * @param values An array of Promises.
     * @returns A new Promise.
     */
    race<T1, T2, T3>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>]): Promise<T1 | T2 | T3>;

    /**
     * Creates a Promise that is resolved or rejected when any of the provided Promises are resolved
     * or rejected.
     * @param values An array of Promises.
     * @returns A new Promise.
     */
    race<T1, T2>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>]): Promise<T1 | T2>;

    /**
     * Creates a Promise that is resolved or rejected when any of the provided Promises are resolved
     * or rejected.
     * @param values An array of Promises.
     * @returns A new Promise.
     */
    race<T>(values: (T | PromiseLike<T>)[]): Promise<T>;

    /**
     * Creates a new rejected promise for the provided reason.
     * @param reason The reason the promise was rejected.
     * @returns A new rejected Promise.
     */
    reject<T = never>(reason?: any): Promise<T>;

    /**
     * Creates a new resolved promise for the provided value.
     * @param value A promise.
     * @returns A promise whose internal state matches the provided promise.
     */
    resolve<T>(value: T | PromiseLike<T>): Promise<T>;

    /**
     * Creates a new resolved promise .
     * @returns A resolved promise.
     */
    resolve(): Promise<void>;
}

declare var Promise: PromiseConstructor;
interface RegExp {}
interface String { charAt: any; }
interface Array<T> {}`
    };

    const newLineCharacter = "\n";
    const formatOptions: FormatCodeSettings = {
        indentSize: 4,
        tabSize: 4,
        newLineCharacter,
        convertTabsToSpaces: true,
        indentStyle: IndentStyle.Smart,
        insertSpaceAfterConstructor: false,
        insertSpaceAfterCommaDelimiter: true,
        insertSpaceAfterSemicolonInForStatements: true,
        insertSpaceBeforeAndAfterBinaryOperators: true,
        insertSpaceAfterKeywordsInControlFlowStatements: true,
        insertSpaceAfterFunctionKeywordForAnonymousFunctions: false,
        insertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis: false,
        insertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets: false,
        insertSpaceAfterOpeningAndBeforeClosingNonemptyBraces: true,
        insertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces: false,
        insertSpaceAfterOpeningAndBeforeClosingJsxExpressionBraces: false,
        insertSpaceBeforeFunctionParenthesis: false,
        placeOpenBraceOnNewLineForFunctions: false,
        placeOpenBraceOnNewLineForControlBlocks: false,
    };

    const notImplementedHost: LanguageServiceHost = {
        getCompilationSettings: notImplemented,
        getScriptFileNames: notImplemented,
        getScriptVersion: notImplemented,
        getScriptSnapshot: notImplemented,
        getDefaultLibFileName: notImplemented,
        getCurrentDirectory: notImplemented,
    };

    function testConvertToAsyncFunction(caption: string, text: string, baselineFolder: string, description: DiagnosticMessage, includeLib?: boolean) {
        const t = getTest(text);
        const selectionRange = t.ranges.get("selection")!;
        if (!selectionRange) {
            throw new Error(`Test ${caption} does not specify selection range`);
        }

        [Extension.Ts, Extension.Js].forEach(extension =>
            it(`${caption} [${extension}]`, () => runBaseline(extension)));

        function runBaseline(extension: Extension) {
            const path = "/a" + extension;
            const program = makeProgram({ path, content: t.source }, includeLib)!;

            if (hasSyntacticDiagnostics(program)) {
                // Don't bother generating JS baselines for inputs that aren't valid JS.
                assert.equal(Extension.Js, extension, "Syntactic diagnostics found in non-JS file");
                return;
            }

            const f = {
                path,
                content: t.source
            };

            const sourceFile = program.getSourceFile(path)!;
            const host = projectSystem.createServerHost([f, libFile]);
            const projectService = projectSystem.createProjectService(host);
            projectService.openClientFile(f.path);
            const languageService = projectService.inferredProjects[0].getLanguageService();
            const context: CodeFixContext = {
                errorCode: 80006,
                span: { start: selectionRange.pos, length: selectionRange.end - selectionRange.pos },
                sourceFile,
                program,
                cancellationToken: { throwIfCancellationRequested: noop, isCancellationRequested: returnFalse },
                preferences: emptyOptions,
                host: notImplementedHost,
                formatContext: formatting.getFormatContext(formatOptions)
            };

            const diagnostics = languageService.getSuggestionDiagnostics(f.path);
            const diagnostic = find(diagnostics, diagnostic => diagnostic.messageText === description.message);
            assert.isNotNull(diagnostic);

            const actions = codefix.getFixes(context);
            const action = find(actions, action => action.description === description.message)!;
            assert.isNotNull(action);

            Harness.Baseline.runBaseline(`${baselineFolder}/${caption}${extension}`, () => {
                const data: string[] = [];
                data.push(`// ==ORIGINAL==`);
                data.push(text.replace("[#|", "/*[#|*/").replace("|]", "/*|]*/"));
                const changes = action.changes;
                assert.lengthOf(changes, 1);

                data.push(`// ==ASYNC FUNCTION::${action.description}==`);
                const newText = textChanges.applyChanges(sourceFile.text, changes[0].textChanges);
                data.push(newText);

                const diagProgram = makeProgram({ path, content: newText }, includeLib)!;
                assert.isFalse(hasSyntacticDiagnostics(diagProgram));
                return data.join(newLineCharacter);
            });
        }

        function makeProgram(f: { path: string, content: string }, includeLib?: boolean) {

            const host = projectSystem.createServerHost(includeLib ? [f, libFile] : [f]); // libFile is expensive to parse repeatedly - only test when required
            const projectService = projectSystem.createProjectService(host);
            projectService.openClientFile(f.path);
            const program = projectService.inferredProjects[0].getLanguageService().getProgram();
            return program;
        }

        function hasSyntacticDiagnostics(program: Program) {
            const diags = program.getSyntacticDiagnostics();
            return length(diags) > 0;
        }
    }

    function testConvertToAsyncFunctionFailed(caption: string, text: string, description: DiagnosticMessage) {
        it(caption, () => {
            const t = extractTest(text);
            const selectionRange = t.ranges.get("selection");
            if (!selectionRange) {
                throw new Error(`Test ${caption} does not specify selection range`);
            }
            const f = {
                path: "/a.ts",
                content: t.source
            };
            const host = projectSystem.createServerHost([f, libFile]);
            const projectService = projectSystem.createProjectService(host);
            projectService.openClientFile(f.path);
            const languageService = projectService.inferredProjects[0].getLanguageService();

            const actions = languageService.getSuggestionDiagnostics(f.path);
            assert.isUndefined(find(actions, action => action.messageText === description.message));
        });
    }

    describe("convertToAsyncFunctions", () => {
        _testConvertToAsyncFunction("convertToAsyncFunction_basic", `
function [#|f|](): Promise<void>{
    return fetch('https://typescriptlang.org').then(result => { console.log(result) });
}`);
    _testConvertToAsyncFunction("convertToAsyncFunction_basicWithComments", `
function [#|f|](): Promise<void>{
    /* Note - some of these comments are removed during the refactor. This is not ideal. */

    // a 
    /*b*/ return /*c*/ fetch( /*d*/ 'https://typescriptlang.org' /*e*/).then( /*f*/ result /*g*/ => { /*h*/ console.log(/*i*/ result /*j*/) /*k*/}/*l*/);
    // m
}`);

        _testConvertToAsyncFunction("convertToAsyncFunction_ArrowFunction", `
[#|():Promise<void> => {|]
    return fetch('https://typescriptlang.org').then(result => console.log(result));
}`);
        _testConvertToAsyncFunction("convertToAsyncFunction_Catch", `
function [#|f|]():Promise<void> {
    return fetch('https://typescriptlang.org').then(result => { console.log(result); }).catch(err => { console.log(err); });
}`);
        _testConvertToAsyncFunction("convertToAsyncFunction_CatchAndRej", `
function [#|f|]():Promise<void> {
    return fetch('https://typescriptlang.org').then(result => { console.log(result); }, rejection => { console.log("rejected:", rejection); }).catch(err => { console.log(err) });
}`);
        _testConvertToAsyncFunction("convertToAsyncFunction_CatchAndRejRef", `
function [#|f|]():Promise<void> {
    return fetch('https://typescriptlang.org').then(res, rej).catch(catch_err)
}
function res(result){
    console.log(result);
}
function rej(rejection){
    return rejection.ok;
}
function catch_err(err){
    console.log(err);
}`);
        _testConvertToAsyncFunction("convertToAsyncFunction_CatchRef", `
function [#|f|]():Promise<void> {
    return fetch('https://typescriptlang.org').then(res).catch(catch_err)
}
function res(result){
    console.log(result);
}
function catch_err(err){
    console.log(err);
}
`);
        _testConvertToAsyncFunction("convertToAsyncFunction_CatchNoBrackets", `
function [#|f|]():Promise<void> {
    return fetch('https://typescriptlang.org').then(result => console.log(result)).catch(err => console.log(err));
}`
        );
        _testConvertToAsyncFunction("convertToAsyncFunction_IgnoreArgs1", `
function [#|f|](): Promise<void> {
    return fetch('https://typescriptlang.org').then( _ => { console.log("done"); });
}`
        );
        _testConvertToAsyncFunction("convertToAsyncFunction_IgnoreArgs2", `
function [#|f|](): Promise<void> {
    return fetch('https://typescriptlang.org').then( () => console.log("done") );
}`
        );
        _testConvertToAsyncFunction("convertToAsyncFunction_Method", `
class Parser {
    [#|f|]():Promise<void> {
        return fetch('https://typescriptlang.org').then(result => console.log(result));
    }
}`
        );
        _testConvertToAsyncFunction("convertToAsyncFunction_MultipleCatches", `
function [#|f|](): Promise<void> {
    return fetch('https://typescriptlang.org').then(res => console.log(res)).catch(err => console.log("err", err)).catch(err2 => console.log("err2", err2));
}`
        );
        _testConvertToAsyncFunction("convertToAsyncFunction_MultipleThens", `
function [#|f|]():Promise<void> {
    return fetch('https://typescriptlang.org').then(res).then(res2);
}
function res(result){
    return result.ok;
}
function res2(result2){
    console.log(result2);
}`
        );
        _testConvertToAsyncFunction("convertToAsyncFunction_MultipleThensSameVarName", `
function [#|f|]():Promise<void> {
    return fetch('https://typescriptlang.org').then(res).then(res2);
}
function res(result){
    return result.ok;
}
function res2(result){
    return result.bodyUsed;
}
`
        );
        _testConvertToAsyncFunction("convertToAsyncFunction_NoRes", `
function [#|f|]():Promise<void | Response> {
    return fetch('https://typescriptlang.org').then(null, rejection => console.log("rejected:", rejection));
}
`
        );
        _testConvertToAsyncFunction("convertToAsyncFunction_NoRes2", `
function [#|f|]():Promise<void | Response> {
    return fetch('https://typescriptlang.org').then(undefined).catch(rej => console.log(rej));
}
`
        );
        _testConvertToAsyncFunction("convertToAsyncFunction_NoRes3", `
function [#|f|]():Promise<void | Response> {
    return fetch('https://typescriptlang.org').catch(rej => console.log(rej));
}
`
        );
        _testConvertToAsyncFunctionFailed("convertToAsyncFunction_NoSuggestion", `
function [#|f|]():Promise<Response> {
    return fetch('https://typescriptlang.org');
}
`
        );
        _testConvertToAsyncFunction("convertToAsyncFunction_PromiseDotAll", `
function [#|f|]():Promise<void>{
    return Promise.all([fetch('https://typescriptlang.org'), fetch('https://microsoft.com'), fetch('https://youtube.com')]).then(function(vals){
        vals.forEach(console.log); 
    });
}
`
        );
        _testConvertToAsyncFunctionFailed("convertToAsyncFunction_NoSuggestionNoPromise", `
function [#|f|]():void{
}
`
        );
        _testConvertToAsyncFunction("convertToAsyncFunction_Rej", `
function [#|f|]():Promise<void> {
    return fetch('https://typescriptlang.org').then(result => { console.log(result); }, rejection => { console.log("rejected:", rejection); });
}
`
        );
        _testConvertToAsyncFunction("convertToAsyncFunction_RejRef", `
function [#|f|]():Promise<void> {
    return fetch('https://typescriptlang.org').then(res, rej);
}
function res(result){
    console.log(result);
}
function rej(err){
    console.log(err);
}
`
        );
        _testConvertToAsyncFunction("convertToAsyncFunction_RejNoBrackets", `
function [#|f|]():Promise<void> {
    return fetch('https://typescriptlang.org').then(result => console.log(result), rejection => console.log("rejected:", rejection));
}
`
        );
        _testConvertToAsyncFunction("convertToAsyncFunction_ResRef", `
function [#|f|]():Promise<boolean> {
    return fetch('https://typescriptlang.org').then(res);
}
function res(result){
    return result.ok;
}
`
        );
        _testConvertToAsyncFunction("convertToAsyncFunction_ResRefNoReturnVal", `
function [#|f|]():Promise<void> {
    return fetch('https://typescriptlang.org').then(res);
}
function res(result){
    console.log(result);
}
`
        );
        _testConvertToAsyncFunction("convertToAsyncFunction_NoBrackets", `
function [#|f|]():Promise<void> {
    return fetch('https://typescriptlang.org').then(result => console.log(result));
}
`
        );
        _testConvertToAsyncFunctionFailed("convertToAsyncFunction_Finally1", `
function [#|finallyTest|](): Promise<void> {
    return fetch("https://typescriptlang.org").then(res => console.log(res)).catch(rej => console.log("error", rej)).finally(console.log("finally!"));
}
`
        );

        _testConvertToAsyncFunctionFailed("convertToAsyncFunction_Finally2", `
function [#|finallyTest|](): Promise<void> {
    return fetch("https://typescriptlang.org").then(res => console.log(res)).finally(console.log("finally!"));
}
`
        );

        _testConvertToAsyncFunctionFailed("convertToAsyncFunction_Finally3", `
function [#|finallyTest|](): Promise<void> {
    return fetch("https://typescriptlang.org").finally(console.log("finally!"));
}
`
        );
        _testConvertToAsyncFunction("convertToAsyncFunction_InnerPromise", `
function [#|innerPromise|](): Promise<string> {
    return fetch("https://typescriptlang.org").then(resp => {
        var blob2 = resp.blob().then(blob => blob.byteOffset).catch(err => 'Error');
        return blob2;
    }).then(blob => {
        return blob.toString();   
    });
}
`
        );
        _testConvertToAsyncFunction("convertToAsyncFunction_InnerPromiseRet", `
function [#|innerPromise|](): Promise<string> {
    return fetch("https://typescriptlang.org").then(resp => {
        return resp.blob().then(blob => blob.byteOffset).catch(err => 'Error');
    }).then(blob => {
        return blob.toString();   
    });
}
`
        );

        _testConvertToAsyncFunctionFailed("convertToAsyncFunction_VarReturn01", `
function [#|f|]() {
    let blob = fetch("https://typescriptlang.org").then(resp => console.log(resp));
    return blob;
}
`
        );
        _testConvertToAsyncFunctionFailed("convertToAsyncFunction_VarReturn02", `
function [#|f|]() {
    let blob = fetch("https://typescriptlang.org");
    blob.then(resp => console.log(resp));
    return blob;
}
`
        );
        _testConvertToAsyncFunctionFailed("convertToAsyncFunction_VarReturn03", `
function [#|f|]() {
    let blob = fetch("https://typescriptlang.org")
    let blob2 = blob.then(resp => console.log(resp));
    blob2.catch(err);
    return blob;
}

function err (rej) {
    console.log(rej)
}
`
        );
        _testConvertToAsyncFunctionFailed("convertToAsyncFunction_VarReturn04", `
function [#|f|]() {
    var blob = fetch("https://typescriptlang.org").then(res => console.log(res)), blob2 = fetch("https://microsoft.com").then(res => res.ok).catch(err);
    return blob;
}
function err (rej) {
    console.log(rej)
}
`
        );

        _testConvertToAsyncFunctionFailed("convertToAsyncFunction_VarReturn05", `
function [#|f|]() {
    var blob = fetch("https://typescriptlang.org").then(res => console.log(res));
    blob.then(x => x);
    return blob;
}
`
        );

        _testConvertToAsyncFunctionFailed("convertToAsyncFunction_VarReturn06", `
function [#|f|]() {
    var blob = fetch("https://typescriptlang.org");
    return blob;
}
`
        );

        _testConvertToAsyncFunctionFailed("convertToAsyncFunction_VarReturn07", `
function [#|f|]() {
    let blob = fetch("https://typescriptlang.org");
    let blob2 = fetch("https://microsoft.com");
    blob2.then(res => console.log("res:", res));
    blob.then(resp => console.log(resp));
    return blob;
}
`
        );

        _testConvertToAsyncFunctionFailed("convertToAsyncFunction_VarReturn08", `
function [#|f|]() {
    let blob = fetch("https://typescriptlang.org");
    if (!blob.ok){
        return blob;
    }
    blob.then(resp => console.log(resp));
    return blob;
}
`
        );

        _testConvertToAsyncFunctionFailed("convertToAsyncFunction_VarReturn09", `
function [#|f|]() {
    let blob3;
    let blob = fetch("https://typescriptlang.org");
    let blob2 = fetch("https://microsoft.com");
    blob2.then(res => console.log("res:", res));
    blob.then(resp => console.log(resp));
    blob3 = blob2.catch(rej => rej.ok);
    return blob;
}
`
        );


        _testConvertToAsyncFunctionFailed("convertToAsyncFunction_VarReturn10", `
function [#|f|]() {
    let blob3;
    let blob = fetch("https://typescriptlang.org");
    let blob2 = fetch("https://microsoft.com");
    blob2.then(res => console.log("res:", res));
    blob.then(resp => console.log(resp));
    blob3 = fetch("test.com");
    blob3 = blob2;
    return blob;
}
`
        );

        _testConvertToAsyncFunctionFailed("convertToAsyncFunction_VarReturn11", `
function [#|f|]() {
    let blob;
    return blob;
}
`
        );



        _testConvertToAsyncFunctionFailed("convertToAsyncFunction_Param1", `
function [#|f|]() {
    return my_print(fetch("https://typescriptlang.org").then(res => console.log(res)));
}
function my_print (resp) {
    if (resp.ok) {
        console.log(resp.buffer);
    }
    return resp;
}

`
        );

_testConvertToAsyncFunction("convertToAsyncFunction_Param2", `
function [#|f|]() {
    return my_print(fetch("https://typescriptlang.org").then(res => console.log(res))).catch(err => console.log("Error!", err));
}
function my_print (resp): Promise<void> {
    if (resp.ok) {
        console.log(resp.buffer);
    }
    return resp;
}


`
        );

        _testConvertToAsyncFunction("convertToAsyncFunction_MultipleReturns1", `
function [#|f|](): Promise<void> {
    let x = fetch("https://microsoft.com").then(res => console.log("Microsoft:", res));
    if (x.ok) {
        return fetch("https://typescriptlang.org").then(res => console.log(res));
    }
    return x.then(resp => {
        var blob = resp.blob().then(blob => blob.byteOffset).catch(err => 'Error');
    });
}
`
        );

        _testConvertToAsyncFunction("convertToAsyncFunction_MultipleReturns2", `
function [#|f|](): Promise<void> {
    let x = fetch("https://microsoft.com").then(res => console.log("Microsoft:", res));
    if (x.ok) {
        return fetch("https://typescriptlang.org").then(res => console.log(res));
    }
    return x.then(resp => {
        var blob = resp.blob().then(blob => blob.byteOffset).catch(err => 'Error');
        return fetch("https://micorosft.com").then(res => console.log("Another one!"));
    });
}
`
        );


        _testConvertToAsyncFunctionFailed("convertToAsyncFunction_SeperateLines", `
function [#|f|](): Promise<string> {
    var blob = fetch("https://typescriptlang.org")
    blob.then(resp => {
        var blob = resp.blob().then(blob => blob.byteOffset).catch(err => 'Error');
    });
    blob.then(blob => {
        return blob.toString();
    });

    return blob;
}
`
        );


        _testConvertToAsyncFunction("convertToAsyncFunction_InnerVarNameConflict", `
function [#|f|](): Promise<string> {
    return fetch("https://typescriptlang.org").then(resp => {
        var blob = resp.blob().then(blob => blob.byteOffset).catch(err => 'Error');
    }).then(blob => {
        return blob.toString();
    });
}
`
        );
        _testConvertToAsyncFunction("convertToAsyncFunction_InnerPromiseSimple", `
function [#|f|](): Promise<string> {
    return fetch("https://typescriptlang.org").then(resp => {
        return resp.blob().then(blob => blob.byteOffset);
    }).then(blob => {
        return blob.toString();
    });
}
`
        );
        _testConvertToAsyncFunction("convertToAsyncFunction_PromiseAllAndThen", `
function [#|f|]() {
    return Promise.resolve().then(function () {
        return Promise.all([fetch("https://typescriptlang.org"), fetch("https://microsoft.com"), Promise.resolve().then(function () {
                return fetch("https://github.com");
              }).then(res => res.toString())]);
    });
}
`
        );

        _testConvertToAsyncFunction("convertToAsyncFunction_PromiseAllAndThen2", `
function [#|f|]() {
    return Promise.resolve().then(function () {
        return Promise.all([fetch("https://typescriptlang.org"), fetch("https://microsoft.com"), Promise.resolve().then(function () {
                return fetch("https://github.com");
              })]).then(res => res.toString());
    });
}
`
        );
        _testConvertToAsyncFunction("convertToAsyncFunction_Scope1", `
function [#|f|]() {
    var var1:Promise<Response>, var2;
    return fetch('https://typescriptlang.org').then( _ => 
      Promise.resolve().then( res => {
        var2 = "test";
        return fetch("https://microsoft.com");
      }).then(res =>
         var1 === res
      )
    ).then(res);
  }
  function res(response){
      console.log(response);
  }
`);

        _testConvertToAsyncFunction("convertToAsyncFunction_Conditionals", `
function [#|f|](){
    return fetch("https://typescriptlang.org").then(res => {
      if (res.ok) {
        return fetch("https://microsoft.com");
      } 
      else {
        if (res.buffer.length > 5) {
          return res;
        } 
        else {
            return fetch("https://github.com");
        }
      }
    });
}
`
        );

        _testConvertToAsyncFunction("convertToAsyncFunction_CatchFollowedByThen", `
function [#|f|](){
    return fetch("https://typescriptlang.org").then(res).catch(rej).then(res);
}

function res(result){
    return result;
}

function rej(reject){
    return reject;
}
`
        );

_testConvertToAsyncFunction("convertToAsyncFunction_CatchFollowedByThenMatchingTypes01", `
function [#|f|](){
    return fetch("https://typescriptlang.org").then(res).catch(rej).then(res);
}

function res(result): number {
    return 5;
}

function rej(reject): number {
    return 3;
}
`
        );

        _testConvertToAsyncFunction("convertToAsyncFunction_CatchFollowedByThenMatchingTypes01NoAnnotations", `
function [#|f|](){
    return fetch("https://typescriptlang.org").then(res).catch(rej).then(res);
}

function res(result){
    return 5;
}

function rej(reject){
    return 3;
}
`
        );


_testConvertToAsyncFunction("convertToAsyncFunction_CatchFollowedByThenMatchingTypes02", `
function [#|f|](){
    return fetch("https://typescriptlang.org").then(res => 0).catch(rej => 1).then(res);
}

function res(result): number {
    return 5;
}
`
        );

_testConvertToAsyncFunction("convertToAsyncFunction_CatchFollowedByThenMatchingTypes02NoAnnotations", `
function [#|f|](){
    return fetch("https://typescriptlang.org").then(res => 0).catch(rej => 1).then(res);
}

function res(result){
    return 5;
}
`
);

        _testConvertToAsyncFunction("convertToAsyncFunction_CatchFollowedByThenMismatchTypes01", `
function [#|f|](){
    return fetch("https://typescriptlang.org").then(res).catch(rej).then(res);
}

function res(result){
    return 5;
}

function rej(reject){
    return "Error";
}
`
        );

_testConvertToAsyncFunction("convertToAsyncFunction_CatchFollowedByThenMismatchTypes02", `
function [#|f|](){
    return fetch("https://typescriptlang.org").then(res).catch(rej).then(res);
}

function res(result){
    return 5;
}

function rej(reject): Response{
    return reject;
}
`
        );

_testConvertToAsyncFunction("convertToAsyncFunction_CatchFollowedByThenMismatchTypes02NoAnnotations", `
function [#|f|](){
    return fetch("https://typescriptlang.org").then(res).catch(rej).then(res);
}

function res(result){
    return 5;
}

function rej(reject){
    return reject;
}
`
        );


_testConvertToAsyncFunction("convertToAsyncFunction_CatchFollowedByThenMismatchTypes03", `
function [#|f|](){
    return fetch("https://typescriptlang.org").then(res).catch(rej).then(res);
}

function res(result){
    return 5;
}

function rej(reject){
    return Promise.resolve(1);
}
`
        );

_testConvertToAsyncFunction("convertToAsyncFunction_CatchFollowedByThenMismatchTypes04", `
interface a {
    name: string;
    age: number;
}

interface b extends a {
    color: string;
}


function [#|f|](){
    return fetch("https://typescriptlang.org").then(res).catch(rej).then(res);
}

function res(result): b{
    return {name: "myName", age: 22, color: "red"};
}

function rej(reject): a{
    return {name: "myName", age: 27};
}
`
        );




        _testConvertToAsyncFunction("convertToAsyncFunction_LocalReturn", `
function [#|f|]() {
    let x = fetch("https://typescriptlang.org").then(res => console.log(res));
    return x.catch(err => console.log("Error!", err));
}

`);
       _testConvertToAsyncFunction("convertToAsyncFunction_PromiseCallInner", `
function [#|f|]() {
    return fetch(Promise.resolve(1).then(res => "https://typescriptlang.org")).catch(err => console.log(err));
}

`);
_testConvertToAsyncFunctionFailed("convertToAsyncFunction_CatchFollowedByCall", `
function [#|f|](){
    return fetch("https://typescriptlang.org").then(res).catch(rej).toString();
}

function res(result){
    return result;
}

function rej(reject){
    return reject;
}
`
        );


        _testConvertToAsyncFunction("convertToAsyncFunction_Scope2", `
function [#|f|](){
    var i:number;
    return fetch("https://typescriptlang.org").then(i => i.ok).then(res => i+1).catch(err => i-1)
}
`
        );

        _testConvertToAsyncFunction("convertToAsyncFunction_Loop", `
function [#|f|](){
    return fetch("https://typescriptlang.org").then(res => { for(let i=0; i<10; i++){
        console.log(res);
    }})
}
`
        );

        _testConvertToAsyncFunction("convertToAsyncFunction_Conditional2", `
function [#|f|](){
    var res = 100;
    if (res > 50) {
        return fetch("https://typescriptlang.org").then(res => console.log(res));
    }
    else {
        return fetch("https://typescriptlang.org").then(res_func);
    }
}

function res_func(result){
    console.log(result);
}
`
        );

        _testConvertToAsyncFunction("convertToAsyncFunction_Scope3", `
function [#|f|]() {
  var obj;
  return fetch("https://typescriptlang.org").then(function (res) {
    obj = {
      func: function f() {
        console.log(res);
      }
    };
  });
} 
`
        );

        _testConvertToAsyncFunctionFailed("convertToAsyncFunction_NestedFunction", `
function [#|f|]() {
    function fn2(){
        function fn3(){
            return fetch("https://typescriptlang.org").then(res => console.log(res));
        }
        return fn3();
    }
    return fn2();
} 
`);

        _testConvertToAsyncFunction("convertToAsyncFunction_UntypedFunction", `
function [#|f|]() {
    return Promise.resolve().then(res => console.log(res));
} 
`);

        _testConvertToAsyncFunction("convertToAsyncFunction_TernaryConditional", `
function [#|f|]() {
    let i;
    return Promise.resolve().then(res => res ? i = res : i = 100);
} 
`);

    _testConvertToAsyncFunction("convertToAsyncFunction_ResRejNoArgsArrow", `
    function [#|f|]() {
        return Promise.resolve().then(() => 1, () => "a"); 
    }
`);


    });

    function _testConvertToAsyncFunction(caption: string, text: string) {
        testConvertToAsyncFunction(caption, text, "convertToAsyncFunction", Diagnostics.Convert_to_async_function, /*includeLib*/ true);
    }

    function _testConvertToAsyncFunctionFailed(caption: string, text: string) {
        testConvertToAsyncFunctionFailed(caption, text, Diagnostics.Convert_to_async_function);
    }
}