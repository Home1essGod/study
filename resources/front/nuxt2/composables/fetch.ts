import { FetchOptions } from "ohmyfetch";

const serverRoute: string = "http://gleb.dev.local";
const apiRoute: string = `${serverRoute}/api`;
const csrf_cookie: string = "XSRF-TOKEN";

/**
 * Return the cookies needed by "Sanctum", browser will handle them automatically.
 */
export const useFetchCookies = async () => {
    await $fetch.raw("api/csrf-cookie", {
        baseURL: serverRoute,
        credentials: "include" // Allow browser to handle cookies
    });
};

/**
 * Api call using nuxt `useFetch`
 *
 * @see {@link https://github.com/unjs/ohmyfetch#readme} ~ ohmyfetch Docs
 * @param url
 * @param options
 */
export const useApi = async (url: string, options?: FetchOptions) => {
    // First we verify if the `xsrf-token` is present on the browser cookies
    let token = useCookie(csrf_cookie)?.value;

    if (!token) {
        // If not present we will re fetch all cookies, the browser will
        // handle them automatically so we don't need to do anything
        await useFetchCookies();

        // Load the new token value to use it in the `headers`
        token = useCookie(csrf_cookie).value;
    }

    // Here we will create a default set of headers for every request
    // if present we will also spread the `headers` set by the user
    // then we will delete them to avoid collision in next spread
    const headers: HeadersInit = {
        Accept: "application/json",
        "Cache-Control": "no-cache",
        "X-XSRF-TOKEN": token,
        ...options?.headers
    };

    // At this point all the `headers` passed by the user where correctly
    // set in the defaults, now we will spread `options` to remove the
    // `headers` attribute so we don't spread it again in `useFetch`
    const opts: FetchOptions = options ? (({ headers, ...opts }) => opts)(options) : null;

    const baseURL = !options?.baseURL ? apiRoute : options.baseURL;

    return useFetch(url, {
        baseURL: baseURL,
        credentials: "include", // Allow browser to handle cookies
        headers,
        ...opts
    });
};
