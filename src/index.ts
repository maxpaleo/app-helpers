// import { App, APP, appErrorCode, PLAN_INTERVAL_MONTHS } from "../../app-config";
// import { Currency } from "@/data/locale/currencies";
// import { DB } from "@/db/schema";
// import { fromError } from "zod-validation-error";
// import { ZodError, ZodSchema } from "zod";
// import { isTruthy } from "./helpers";

/**
 * // TODO
 * - Add function prettyDate()
 * - Create clipboard.copy + paste
 */

// type SessionPath = `/session?redirect=${App.Paths.Paths}`; New
// New update

export namespace AppHelpers {
  /**
   *
   */

  /**
   *
   */
  //   export function makeAppPath(path: App.Paths.Paths): App.Paths.Paths {
  //     for (const group of Object.values(App.Paths.Config)) {
  //       if (path in (group as Record<string, string>)) {
  //         return (group as Record<App.Paths.Paths, App.Paths.Paths>)[path];
  //       }
  //     }
  //     console.error(`Path ${path} is not a valid app path`);
  //     throw new Error(`Path ${path} is not a valid app path`);
  //   }

  /**
   *
//    */
  //   export function makeSessionPath(
  //     path: App.Paths.Paths,
  //     orgId?: number
  //   ): `/session?redirect=${App.Paths.Paths}` | `/session?redirect=${App.Paths.Paths}&org_id=${number}` {
  //     for (const group of Object.values(App.Paths.Config)) {
  //       if (path in (group as Record<string, string>)) {
  //         const appPath = (group as Record<App.Paths.Paths, App.Paths.Paths>)[path];

  //         const sessionPath = orgId ? (`/session?redirect=${appPath}&org_id=${orgId}` as SessionPath) : (`/session?redirect=${appPath}` as SessionPath);
  //         console.log("sessionPath:", sessionPath);

  //         return sessionPath;
  //       }
  //     }
  //     console.error(`Path ${path} is not a valid app path`);
  //     throw new Error(`Path ${path} is not a valid app path`);
  //   }

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

  /* -------------------------------------------------------------------------- */
  /*                                   Storage                                  */
  /* -------------------------------------------------------------------------- */
  export const localStorageUtil = {
    /**
     * Sets an item in localStorage.
     *
     * @param key The key under which to store the item.
     * @param value The value to store; it will be automatically stringified.
     */
    set(key: string, value: any): void {
      try {
        const serializedValue = JSON.stringify(value);
        localStorage.setItem(key, serializedValue);
      } catch (error) {
        console.error("Error saving to localStorage", error);
      }
    },

    /**
     * Retrieves an item from localStorage and parses it to its original form.
     *
     * @param key The key under which the item is stored.
     * @returns The parsed value or null if the key does not exist or parsing fails.
     */
    get<T>(key: string): T | null {
      try {
        const item = localStorage.getItem(key);
        return item ? (JSON.parse(item) as T) : null;
      } catch (error) {
        console.error("Error reading from localStorage", error);
        return null;
      }
    },
  };

  export const sessionStorageUtil = {
    /**
     * Sets an item in sessionStorage.
     *
     * @param key The key under which to store the item.
     * @param value The value to store; it will be automatically stringified.
     */
    set(key: string, value: any): void {
      try {
        const serializedValue = JSON.stringify(value);
        sessionStorage.setItem(key, serializedValue);
      } catch (error) {
        console.error("Error saving to sessionStorage", error);
      }
    },

    /**
     * Retrieves an item from sessionStorage and parses it to its original form.
     *
     * @param key The key under which the item is stored.
     * @returns The parsed value or null if the key does not exist or parsing fails.
     */
    get<T>(key: string): T | null {
      try {
        const item = sessionStorage.getItem(key);
        return item ? (JSON.parse(item) as T) : null;
      } catch (error) {
        console.error("Error reading from sessionStorage", error);
        return null;
      }
    },
  };

  /* -------------------------------------------------------------------------- */
  /*                                  Clipboard                                 */
  /* -------------------------------------------------------------------------- */

  export const clipboard = {
    /**
     * Copies the given text to the clipboard.
     *
     * @param text The text to copy to the clipboard.
     * @returns A promise that resolves if the text was copied successfully, or rejects if there was an error.
     */
    copy(text: string): Promise<void> {
      return navigator.clipboard
        .writeText(text)
        .then(() => console.log("Text copied to clipboard"))
        .catch((error) => {
          console.error("Failed to copy text to clipboard", error);
          throw error;
        });
    },

    /**
     * Pastes text from the clipboard.
     *
     * @returns A promise that resolves with the text from the clipboard, or rejects if there was an error.
     */
    paste(): Promise<string> {
      return navigator.clipboard
        .readText()
        .then((text) => {
          console.log("Text pasted from clipboard");
          return text;
        })
        .catch((error) => {
          console.error("Failed to read text from clipboard", error);
          throw error;
        });
    },
  };

  /* -------------------------------------------------------------------------- */
  /*                                    Date                                    */
  /* -------------------------------------------------------------------------- */

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
  export function subtractDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() - days);
    return result;
  }

  export function stringToDate(dateString = ""): Date {
    return new Date(dateString);
  }

  export function dateToString(date: Date): string {
    return date.toISOString().split("T")[0];
  }

  /* -------------------------------------------------------------------------- */
  /*                                   Format                                   */
  /* -------------------------------------------------------------------------- */

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
  export function prettyText(input: string): string {
    // console.log("input", input);
    // Replace all underscores with spaces
    if (!input) return "";
    // console.log("input", input);
    const replacedString = input.replace(/_/g, " ");
    // Capitalize the first letter of the resulting string
    const capitalizedString = replacedString.charAt(0).toUpperCase() + replacedString.slice(1);

    return capitalizedString;
  }

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
  export function prettyFileSize(bytes: number): string {
    const KB = 1024;
    const MB = KB * 1024;
    const GB = MB * 1024;

    if (bytes >= GB) {
      return `${(bytes / GB).toFixed(2)} GB`;
    } else if (bytes >= MB) {
      return `${(bytes / MB).toFixed(2)} MB`;
    } else if (bytes >= KB) {
      return `${(bytes / KB).toFixed(2)} KB`;
    } else {
      return `${bytes} bytes`;
    }
  }

  /**
   * Formats a given date input into a human-readable string based on its relation to the current date.
   * The function accepts dates in various formats (Date object, string, or number) and returns a formatted string.
   * If the date is invalid, it attempts to correct the format. If it still remains invalid, it returns an error message.
   *
   * @param {Date|string|number} dateInput - The date input to be formatted. Can be a Date object, a string, or a timestamp.
   * @returns {string} A formatted date string. If the date is today, yesterday, within this week, or within this year, it formats accordingly.
   *                   For invalid dates, returns "Invalid data format".
   */
  export function prettyDate(dateInput: Date | string | number, withHours: boolean = true, withYear: boolean = true): string {
    let date = new Date(dateInput);
    if (!date || isNaN(date.getTime())) {
      // Attempt to correct the date format if `dateInput` is provided
      if (typeof dateInput === "string") {
        const correctedDateInput = dateInput.replace(/(\d{4})(\d{2})/, "$1 $2").replace(/(\d{2})(AM|PM)/i, "$1 $2");
        date = new Date(correctedDateInput);

        // Check again if the corrected date is valid
        if (isNaN(date.getTime())) {
          return "Invalid data format";
        }
      } else {
        return "Invalid data format";
      }
    }

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const thisWeekStart = new Date(today);
    thisWeekStart.setDate(thisWeekStart.getDate() - today.getDay());

    const isToday = date >= today;
    const isYesterday = date >= yesterday && date < today;
    const isThisWeek = date >= thisWeekStart && date < today;
    const isThisYear = date.getFullYear() === now.getFullYear();

    const dateOptions: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "numeric",
    };
    if (withYear) {
      dateOptions.year = "numeric";
    }

    const dateString = date.toLocaleDateString("en-US", dateOptions);

    if (!withHours) {
      return dateString;
    }

    const timeString = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    if (isToday) {
      return `Today at ${timeString}`;
    } else if (isYesterday) {
      return `Yesterday at ${timeString}`;
    } else if (isThisWeek) {
      return `${date.toLocaleDateString("en-US", {
        weekday: "long",
      })} at ${timeString}`;
    } else {
      return `${dateString} at ${timeString}`;
    }
  }

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
  export function prettyPrice(amount: number, currency: string = "usd", decimalPlaces: number = 2, withSymbol: boolean = true): string {
    // Set the default currency symbols and locales
    const currencySymbols: { [key: string]: string } = {
      usd: "$",
      eur: "€",
      gbp: "£",
      jpy: "¥",
      // Add more as needed
    };

    // Clamp decimalPlaces between 0 and 6
    const decimals = Math.max(0, Math.min(decimalPlaces, 6));

    // Format amount to specified decimal places
    const formattedAmount = amount.toFixed(decimals);

    // Determine the currency symbol if `withSymbol` is true
    const symbol = withSymbol ? currencySymbols[currency.toLowerCase()] || "" : "";

    // Construct the final price string
    return `${symbol}${formattedAmount}`;
  }

  /**
   * Capitalizes the first letter of the provided string. If the input string is empty,
   * it returns the empty string without modification.
   *
   * @param {string} inputString - The string to be modified by capitalizing its first character.
   * @returns {string} The modified string with the first letter capitalized if not empty;
   * otherwise, returns the original empty string.
   */
  export function capitalizeFirstLetter(inputString: string): string {
    if (inputString.length === 0) {
      return inputString; // Return empty string if input is empty
    }
    return inputString.charAt(0).toUpperCase() + inputString.slice(1);
  }

  export function truncate(str: string | null | undefined, length: number): string | null | undefined {
    // Check if `str` is a string and has a length exceeding the specified `length`
    if (typeof str === "string" && str.length > length) {
      return `${str.slice(0, length)}...`;
    }
    return str;
  }

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
  export function toKebabCase(input: string): string {
    // Return an empty string if input is falsy
    if (!input) {
      return "";
    }

    return input
      .trim() // Remove whitespace from both ends of the string
      .toLowerCase() // Convert the string to lowercase
      .replace(/\s+/g, "-") // Replace all spaces with hyphens
      .replace(/[^a-z0-9-]/g, ""); // Remove characters that are not alphanumeric or hyphens
  }

  /* -------------------------------------------------------------------------- */
  /*                                    Other                                   */
  /* -------------------------------------------------------------------------- */

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
  export function generateSequence(length: number): number[] {
    return Array.from({ length }, (_, i) => i + 1);
  }

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
  export function shuffle(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

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
  export function decodeUrlText(encodedText: string): string {
    return decodeURIComponent(encodedText);
  }

  // export function getUserRoleValueLabels(): Array<{
  //   value: keyof (typeof APP)["userRoles"];
  //   label: (typeof APP)["userRoles"][keyof (typeof APP)["userRoles"]]["title"];
  // }> {
  //   const userRoleValueLabels = Object.entries(APP["userRoles"])
  //     .filter(([key, _]) => key !== "super_admin")
  //     .map(([key, value]) => ({
  //       value: key as keyof (typeof APP)["userRoles"],
  //       label: value.title,
  //     }));
  //   return userRoleValueLabels;
  // }

  /* -------------------------------------------------------------------------- */
  /*                               Authentication                               */
  /* -------------------------------------------------------------------------- */
  // export type MagicLinks = keyof typeof MAGIC_LINKS;
  // export const MAGIC_LINKS = {
  //   reset_password: (userId: number, token: string) => {
  //     return `${APP.domainWithProtocol}/reset-password?u=${userId}&token=${token}` as const;
  //   },
  // } as const;

  /* -------------------------------------------------------------------------- */
  /*                                   Billing                                  */
  /* -------------------------------------------------------------------------- */

  /* -------------------------------------------------------------------------- */
  /*                                    Plans                                   */
  /* -------------------------------------------------------------------------- */

  /**
   * Converts a price from cents to a normal format.
   * @param priceInCents The price in the smallest currency unit (like cents).
   * @param decimalPlaces The number of decimal places to return. Defaults to 2 for most currencies.
   * @returns The price converted to the main currency unit (like dollars).
   */
  export function convertPriceFromCents(priceInCents: number, decimalPlaces: number = 2): string {
    const price = priceInCents / 100;
    return price.toFixed(decimalPlaces);
  }

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
  // export function getDynamicPlanPrice({ planId, currency, interval }: { planId: App.Plans.Id; currency?: Currency; interval?: App.Plans.PlanProductInterval }): {
  //   plan: App.Plans.Id;
  //   price: number;
  //   currency: Currency;
  //   interval: App.Plans.PlanProductInterval;
  // } | null {
  //   if (!planId) {
  //     console.error("Plan ID is undefined");
  //     return null;
  //   }
  //   // const plan = getPlanProductBy("id", planId);
  //   const plan = App.Plans.Config[planId];
  //   isTruthy(plan, "Plan not found", true);

  //   /** If currency or interval are not provided, use the default values from the app config. */
  //   currency = currency ? currency : APP.config.general.defaultValues.currency;
  //   interval = interval ? interval : APP.config.billing.plans.interval[0];

  //   const intervalMonths = PLAN_INTERVAL_MONTHS[interval];

  //   /** The default price for the plan. */
  //   let planPrice = plan.prices.default;

  //   /** Multiplies the price by the interval months. */
  //   planPrice = planPrice * intervalMonths;

  //   /** Gets the discount percentage for the interval. */
  //   const intervalDiscount = APP.config.billing.plans.pricingConditions.recurringDiscountPercentage[interval];

  //   /** If a discount is set for the interval, apply it to the price. */
  //   let price = planPrice * (1 - intervalDiscount / 100);

  //   /** If price rounding is enabled, round the price. */
  //   if (APP.config.billing.general.roundPrices) {
  //     price = Math.round(planPrice);
  //   }

  //   return {
  //     plan: plan.id,
  //     interval: interval,
  //     price: price,
  //     currency: currency,
  //   };
  // }

  /* -------------------------------------------------------------------------- */
  /*                                   Router                                   */
  /* -------------------------------------------------------------------------- */

  /**
   * Checks if the user has the specified role. Pass in an array of roles.
   * - NOTE: If no `roleRestrictions` are provided, it will always return true.
   *
   * @example
   * userHasRole(["admin", "super_admin"], "admin") // true
   */
  // function userHasRole(
  //   roleRestrictions: DB.Tables.UserToOrganizations.Type["account_type"][] | undefined,
  //   userRole: DB.Tables.UserToOrganizations.Type["account_type"]
  // ): boolean {
  //   if (!roleRestrictions) return true;
  //   return !roleRestrictions || (userRole && roleRestrictions.includes(userRole));
  // }

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
  // export function parseSchema(schema: ZodObject<any>, data: any) {
  //   const validation = schema.safeParse(data);

  //   if (validation.success) {
  //     return validation.data;
  //   } else {
  //     console.error("Zod parseSchema error:", String(fromError(validation.error)));
  //     throw new Error(String(fromError(validation.error)));
  //   }
  // }

  /**
   * The Env type is set in the `ENV` variable in the .env file.
   * - Your ENV File should be set to `development`.
   * - The server has it set to `development` by default.
   */
  //   const ZodEnvTypes = ["development", "test", "production"] as const;
  //   export type EnvTypes = (typeof ZodEnvTypes)[number];
  //   const ENV = process.env.ENV || (process.env.NEXT_PUBLIC_ENV as EnvTypes) || "development";
  //   const invalidEnvMessage = `ERROR - @paleo-org/paleo-helpers NPM Package issue. - Invalid environment type: ${ENV}. Add ENV=development to your .env file.`;

  //   export function isEnvType(env: string): env is EnvTypes {
  //     const validEnvType = ZodEnvTypes.includes(env as EnvTypes);
  //     if (!validEnvType) {
  //       console.log(invalidEnvMessage);
  //       return false;
  //     } else {
  //       return validEnvType;
  //     }
  //   }

  /* -------------------------------------------------------------------------- */
  /*                             Validate Zod Schema                            */
  //   /* -------------------------------------------------------------------------- */
  //   interface ValidateZodSchemaResult<T> {
  //     success: boolean;
  //     data?: T;
  //     error?: ZodError;
  //     logError?: boolean;
  //   }
  //   interface ValidateZodSchemaOptions<T> {
  //     schema: ZodSchema<T>;
  //     data: unknown;
  //     safeParse?: boolean;
  //     message?: string;
  //     logError?: boolean;
  //     returnOnError?: boolean;
  //   }
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
  //   export function validateZodSchema<T>(options: ValidateZodSchemaOptions<T>): ValidateZodSchemaResult<T> | undefined {
  //     const validEnv = isEnvType(ENV || "");
  //     if (!validEnv) return;

  //     const { schema, data, safeParse = true, message, logError = true } = options;

  //     if (safeParse === true) {
  //       const result = schema.safeParse(data) as ValidateZodSchemaResult<T>;
  //       if (!result.success) {
  //         // Log the validation error
  //         const errorMessage = `${message || ""} - Validation error: ${result?.error?.message || "Unknown error"}`;

  //         if (logError) {
  //           console.error(errorMessage);
  //         }

  //         return {
  //           success: false,
  //           error: result.error,
  //         };
  //       } else {
  //         return {
  //           success: true,
  //           data: result.data,
  //         };
  //       }
  //     } else {
  //       try {
  //         const validatedData = schema.parse(data);
  //         return {
  //           success: true,
  //           data: validatedData,
  //         };
  //       } catch (error: any) {
  //         const errorMessage = `Validation error: ${error.message || "Unknown error"}`;

  //         if (logError) {
  //           console.error(errorMessage);
  //         }
  //         throw new Error(errorMessage);
  //       }
  //     }
  //   }
}
