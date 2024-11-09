/**
 * // TODO
 * - Add function prettyDate()
 * - Create clipboard.copy + paste
 */
export declare namespace AppHelpers {
    /**
     *
     */
    /**
     *
     */
    /**
     *
  //    */
    /**
     * // TODO
     * - Add function prettyDate()
     * - Create clipboard.copy + paste
     */
    /**
     * Structure
     * X Clipboard
     * X Date
     * - String
     * - Format
     * X Storage
     *   X LocalStorage
     *   X SessionStorage
     */
    const localStorageUtil: {
        /**
         * Sets an item in localStorage.
         *
         * @param key The key under which to store the item.
         * @param value The value to store; it will be automatically stringified.
         */
        set(key: string, value: any): void;
        /**
         * Retrieves an item from localStorage and parses it to its original form.
         *
         * @param key The key under which the item is stored.
         * @returns The parsed value or null if the key does not exist or parsing fails.
         */
        get<T>(key: string): T | null;
    };
    const sessionStorageUtil: {
        /**
         * Sets an item in sessionStorage.
         *
         * @param key The key under which to store the item.
         * @param value The value to store; it will be automatically stringified.
         */
        set(key: string, value: any): void;
        /**
         * Retrieves an item from sessionStorage and parses it to its original form.
         *
         * @param key The key under which the item is stored.
         * @returns The parsed value or null if the key does not exist or parsing fails.
         */
        get<T>(key: string): T | null;
    };
    const clipboard: {
        /**
         * Copies the given text to the clipboard.
         *
         * @param text The text to copy to the clipboard.
         * @returns A promise that resolves if the text was copied successfully, or rejects if there was an error.
         */
        copy(text: string): Promise<void>;
        /**
         * Pastes text from the clipboard.
         *
         * @returns A promise that resolves with the text from the clipboard, or rejects if there was an error.
         */
        paste(): Promise<string>;
    };
    /**
     * Converts a string to snake case, where all letters are lowercase and words are separated by underscores.
     * This function trims whitespace from both ends of the string, converts the entire string to lowercase,
     * replaces spaces with underscores, and removes characters that are not alphanumeric or underscores. It's useful
     * for creating database keys, variable names, or other identifiers that require an underscore-separated format.
     *
     * @param {string} input - The string to be converted to snake case. If the input is falsy (empty, null, or undefined),
     *                         the function returns an empty string.
     * @returns {string} The snake_case version of the input string. Returns an empty string if the input is falsy.
     *
     * @example
     * const snakeCaseString = toSnakeCase("Hello, World!"); // Returns "hello_world"
     */
    function subtractDays(date: Date, days: number): Date;
    function stringToDate(dateString?: string): Date;
    function dateToString(date: Date): string;
    /**
     * Transforms the input string by replacing all underscores with spaces and capitalizing the first letter
     * of the resulting string. This function is useful for formatting strings like database keys or identifiers
     * into a more readable form.
     *
     * @param {string} input - The string to be transformed. If the input is empty or undefined, the function returns an empty string.
     * @returns {string} The transformed string with underscores replaced by spaces and the first letter capitalized.
     *                   Returns an empty string if the input is empty or undefined.
     *
     * @example
     * const formattedString = prettyText("first_name"); // Returns "First name"
     */
    function prettyText(input: string): string;
    /**
     * Converts file size from bytes to a more readable format (KB, MB, or GB).
     *
     * @param bytes The file size in bytes.
     * @returns The formatted file size string.
     *
     * @example
     * ```tsx
     * const fileSize = prettyFileSize(1024);
     * console.log(fileSize); // Outputs: "1 KB"
     * ```
     */
    function prettyFileSize(bytes: number): string;
    /**
     * Formats a given date input into a human-readable string based on its relation to the current date.
     * The function accepts dates in various formats (Date object, string, or number) and returns a formatted string.
     * If the date is invalid, it attempts to correct the format. If it still remains invalid, it returns an error message.
     *
     * @param {Date|string|number} dateInput - The date input to be formatted. Can be a Date object, a string, or a timestamp.
     * @returns {string} A formatted date string. If the date is today, yesterday, within this week, or within this year, it formats accordingly.
     *                   For invalid dates, returns "Invalid data format".
     */
    function prettyDate(dateInput: Date | string | number, withHours?: boolean, withYear?: boolean): string;
    /**
     * Formats a given number as a currency amount with a specified decimal precision and currency symbol.
     *
     * @param amount The number to be formatted as a currency amount.
     * @param currency The currency code to use for the currency symbol. Default is "usd".
     * @param decimalPlaces The number of decimal places to display. Default is 2.
     * @param withSymbol Whether to include the currency symbol in the formatted string. Default is true.
     * @returns The formatted currency amount as a string.
     *
     * @example
     * const formattedPrice = prettyPrice(1000); // Outputs "$1,000.00"
     * const formattedPrice = prettyPrice(1000, "eur"); // Outputs "€1,000.00"
     * const formattedPrice = prettyPrice(1000, "usd", 0, false); // Outputs "$1,000"
     */
    function prettyPrice(amount: number, currency?: string, decimalPlaces?: number, withSymbol?: boolean): string;
    /**
     * Capitalizes the first letter of the provided string. If the input string is empty,
     * it returns the empty string without modification.
     *
     * @param {string} inputString - The string to be modified by capitalizing its first character.
     * @returns {string} The modified string with the first letter capitalized if not empty;
     * otherwise, returns the original empty string.
     */
    function capitalizeFirstLetter(inputString: string): string;
    function truncate(str: string | null | undefined, length: number): string | null | undefined;
    /**
     * Converts a string to kebab case, where all letters are lowercase and words are separated by hyphens.
     * This function trims whitespace from both ends of the string, converts the entire string to lowercase,
     * replaces spaces with hyphens, and removes characters that are not alphanumeric or hyphens. It's useful
     * for creating URL slugs, CSS class names, or other identifiers that require a hyphen-separated format.
     *
     * @param {string} input - The string to be converted to kebab case. If the input is falsy (empty, null, or undefined),
     *                         the function returns an empty string.
     * @returns {string} The kebab-case version of the input string. Returns an empty string if the input is falsy.
     *
     * @example
     * const kebabCaseString = toKebabCase("Hello, World!"); // Returns "hello-world"
     */
    function toKebabCase(input: string): string;
    /**
     * Generates a sequence of numbers from 1 to the specified length. The generated sequence
     * is returned as an array of numbers. This function is useful for creating an array of
     * numbers to be used as keys or indices in various scenarios.
     *
     * @param {number} length - The length of the sequence to generate. Must be a positive integer.
     * @returns {number[]} An array of numbers from 1 to the specified length.
     *
     * @example
     * const sequence = generateSequence(5); // Returns [1, 2, 3, 4, 5]
     */
    function generateSequence(length: number): number[];
    /**
     * Shuffles the elements of an array in place using the Fisher-Yates algorithm.
     * This function modifies the original array and returns it after shuffling.
     *
     * @param {any[]} array - The array to be shuffled.
     * @returns {any[]} The shuffled array with its elements rearranged in random order.
     *
     * @example
     * const shuffledArray = shuffle([1, 2, 3, 4, 5]); // Returns [3, 1, 5, 2, 4]
     */
    function shuffle(array: any[]): any[];
    /**
     * Encodes a given text string to make it safe for use in a URL. This function replaces special characters,
     * spaces, and non-alphanumeric characters with their corresponding URL-encoded values. It's useful for
     * creating URL-safe strings for query parameters, paths, or other parts of a URL.
     *
     * @param {string} text - The text string to be encoded for use in a URL.
     * @returns {string} The URL-encoded version of the input text string.
     *
     * @example
     * const encodedText = encodeUrlText("Hello, World!"); // Returns "Hello%2C%20World%21"
     */
    function decodeUrlText(encodedText: string): string;
    /**
     * Converts a price from cents to a normal format.
     * @param priceInCents The price in the smallest currency unit (like cents).
     * @param decimalPlaces The number of decimal places to return. Defaults to 2 for most currencies.
     * @returns The price converted to the main currency unit (like dollars).
     */
    function convertPriceFromCents(priceInCents: number, decimalPlaces?: number): string;
    /**
     * This function returns the plan price dynamically, based on the app configuration, and available plan prices.
     * - If the app config `billing.plans.autoConvertPlanPrice` is set to false, it will always return the default price and currency for the plan.
     * - If no currency is provided, it will return the default price and currency for the plan.
     * - If a currency is provided, it will return the custom price and currency for the plan if it exists. Otherwise, it will return the default price and currency for the plan.
     *
     * #### Returns
     * ```json
     * {
     *   price: number;
     *   currency: Currency;
     * }
     * ```
     */
    /**
     * Checks if the user has the specified role. Pass in an array of roles.
     * - NOTE: If no `roleRestrictions` are provided, it will always return true.
     *
     * @example
     * userHasRole(["admin", "super_admin"], "admin") // true
     */
    /**
     * Custom Zod Parser function to handle schema validation.
     * - I created this because it uses the `fromError` utility function to conver Zod errors into human readable strings.
     * - This function runs a safeparse on the scehma and data and if an error is present, is throws an error in human readble format and logs the default zod error to the console.
     * - Summary: Its basically the same as the zod parse function, but will throw an error in human readable format.
     *
     * ### This happens when the function runs:
     * ```ts
     * const validation = schema.safeParse(data);
     * if (validation.success) {
     *   return validation.data;
     * } else {
     *   console.error(String(validation));
     *   throw new Error(String(fromError(validation.error)));
     * }
     * ```
     */
    /**
     * The Env type is set in the `ENV` variable in the .env file.
     * - Your ENV File should be set to `development`.
     * - The server has it set to `development` by default.
     */
    /**
     * Validates an unknown data object against a given Zod schema. If the data satisfies the schema,
     * the function completes without error, and TypeScript's type system will recognize the data as type T
     * beyond this point in the code. If the data does not satisfy the schema, it logs and throws a
     * ValidationError with detailed information about the discrepancies.
     *
     * @example validateZodSchema(DataSourceDataZod, TEST_DATASOURCE);
     *
     * @template T The expected type of the data after validation, inferred from the Zod schema.
     * @param {ZodSchema<T>} schema The Zod schema against which to validate the data.
     * @param {unknown} data The data to validate. Its type is unknown, and the function checks whether it conforms to the schema.
     * @param {boolean} [safeParse] If true, the function will use safeParse instead of parse to validate the data.
     * @param {string} [message] An optional message to include in the error if the data does not conform to the schema.
     * @throws {Error} Throws an error with a message detailing the validation issues if the data does not conform to the schema.
     * @returns {asserts data is T} This return type is a TypeScript assertion that informs the compiler the data is of type T if the function completes successfully.
     */
}
