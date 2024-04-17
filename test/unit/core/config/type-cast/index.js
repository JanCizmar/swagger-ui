/**
 * @prettier
 */
import typeCast from "core/config/type-cast"

jest.mock("root/swagger-config.yaml", () => {})
jest.mock("swagger-client/es/resolver/strategies/generic", () => {})
jest.mock("swagger-client/es/resolver/strategies/openapi-2", () => {})
jest.mock("swagger-client/es/resolver/strategies/openapi-3-0", () => {})
jest.mock("swagger-client/es/resolver/strategies/openapi-3-1-apidom", () => {})
jest.mock("swagger-client/es/resolver", () => {})
jest.mock("swagger-client/es/execute", () => {})
jest.mock("swagger-client/es/http", () => {})
jest.mock("swagger-client/es/subtree-resolver", () => {})
jest.mock("swagger-client/es/helpers", () => {})

describe("typeCast", () => {
  it("should cast stringified `true` and `false` values to `boolean`", () => {
    const config = {
      deepLinking: "true",
      tryItOutEnabled: "false",
      withCredentials: "true",
      filter: "false",
    }

    const expectedConfig = {
      deepLinking: true,
      tryItOutEnabled: false,
      withCredentials: true,
      filter: false,
    }

    expect(typeCast(config)).toStrictEqual(expectedConfig)
  })

  it("should cast stringified `number` values to `number`", () => {
    const config = {
      defaultModelExpandDepth: "5",
      defaultModelsExpandDepth: "-1",
      maxDisplayedTags: "1",
    }

    const expectedConfig = {
      defaultModelExpandDepth: 5,
      defaultModelsExpandDepth: -1,
      maxDisplayedTags: 1,
    }

    expect(typeCast(config)).toStrictEqual(expectedConfig)
  })

  it("should cast stringified `null` values to `null`", () => {
    const config = {
      validatorUrl: "null",
      filter: "null",
    }

    const expectedConfig = {
      validatorUrl: null,
      filter: null,
    }

    expect(typeCast(config)).toStrictEqual(expectedConfig)
  })

  it("should cast non-number values to `NaN`", () => {
    const config = {
      maxDisplayedTags: "null",
      defaultModelExpandDepth: {},
      defaultModelsExpandDepth: false,
    }

    const expectedConfig = {
      maxDisplayedTags: NaN,
      defaultModelExpandDepth: NaN,
      defaultModelsExpandDepth: NaN,
    }

    expect(typeCast(config)).toStrictEqual(expectedConfig)
  })

  it("should cast stringified `undefined` values to `undefined`", () => {
    const config = { withCredentials: "undefined" }

    const expectedConfig = { withCredentials: undefined }

    expect(typeCast(config)).toStrictEqual(expectedConfig)
  })

  it("should cast `string` values to `string`", () => {
    const config = { defaultModelRendering: "model", filter: "pet" }

    const expectedConfig = { defaultModelRendering: "model", filter: "pet" }

    expect(typeCast(config)).toStrictEqual(expectedConfig)
  })

  it("should cast stringified values to correct type", () => {
    const config = {
      dom_id: "null",
      oauth2RedirectUrl: "undefined",
      syntaxHighlight: "false",
      urls: "null",
      withCredentials: "false",
    }

    const expectedConfig = {
      dom_id: null,
      oauth2RedirectUrl: undefined,
      syntaxHighlight: { activated: false },
      urls: null,
      withCredentials: false,
    }

    expect(typeCast(config)).toStrictEqual(expectedConfig)
  })

  it("should cast incorrect value types to default value", () => {
    const config = {
      deepLinking: "deepLinking",
      urls: "urls",
      syntaxHighlight: "syntaxHighlight",
      spec: "spec",
    }

    const expectedConfig = {
      deepLinking: false,
      urls: null,
      syntaxHighlight: { activated: true, theme: "agate" },
      spec: {},
    }

    expect(typeCast(config)).toStrictEqual(expectedConfig)
  })
})
