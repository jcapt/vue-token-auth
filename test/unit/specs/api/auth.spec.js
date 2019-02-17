import axios from "axios"
import { configAuth } from "@/index"

const MockAdapter = require('axios-mock-adapter')
const mock = new MockAdapter(axios)

describe("configAuth", () => {
  const authUrl = "http://example.com"
  const signInAuthUrl = authUrl + "/sign_in"
  const signOutAuthUrl = authUrl + "/sign_out"
  const passwordAuthUrl = authUrl + "/password"
  const validateTokenAuthUrl = authUrl + "/validate_token"
  const configuredAuth = configAuth(authUrl)

  it("configures actions for url", () => {

    expect(configuredAuth.register).toBeInstanceOf(Function)
    expect(configuredAuth.login).toBeInstanceOf(Function)
    expect(configuredAuth.remindPassword).toBeInstanceOf(Function)
    expect(configuredAuth.changePassword).toBeInstanceOf(Function)
    expect(configuredAuth.verifyToken).toBeInstanceOf(Function)
    expect(configuredAuth.logout).toBeInstanceOf(Function)
  })

  describe(".register", () => {
    it("sends post request", done => {
      mock.onPost(authUrl).reply(200, {})

      const exampleCredentials = {
        email: "example@example.com"
      }

      configuredAuth.register(exampleCredentials).then(e => {
        expect(e.config.data).toEqual(JSON.stringify(exampleCredentials))
        expect(e.config.method).toEqual('post')
        expect(e.config.url).toEqual(authUrl)
        done()
      })
    })
  })

  describe(".login", () => {
    it("sends post request", done => {
      mock.onPost(signInAuthUrl).reply(200, {})

      const exampleCredentials = {
        email: "example@example.com"
      }

      configuredAuth.login(exampleCredentials).then(e => {
        expect(e.config.data).toEqual(JSON.stringify(exampleCredentials))
        expect(e.config.method).toEqual('post')
        expect(e.config.url).toEqual(signInAuthUrl)
        done()
      })
    })
  })

  describe(".remindPassword", () => {
    it("sends post request", done => {
      mock.onPost(passwordAuthUrl).reply(200, {})

      const exampleCredentials = {
        email: "example@example.com"
      }

      configuredAuth.remindPassword(exampleCredentials).then(e => {
        expect(e.config.data).toEqual(JSON.stringify(exampleCredentials))
        expect(e.config.method).toEqual('post')
        expect(e.config.url).toEqual(passwordAuthUrl)
        done()
      })
    })
  })

  describe(".changePassword", () => {
    it("sends post request", done => {
      mock.onPut(passwordAuthUrl).reply(200, {})

      const exampleCredentials = {
        email: "example@example.com"
      }

      configuredAuth.changePassword(exampleCredentials).then(e => {
        expect(e.config.data).toEqual(JSON.stringify(exampleCredentials))
        expect(e.config.method).toEqual('put')
        expect(e.config.url).toEqual(passwordAuthUrl)
        done()
      })
    })
  })

  describe(".verifyToken", () => {
    it("sends post request", done => {
      mock.onGet(validateTokenAuthUrl).reply(200, {})

      configuredAuth.verifyToken().then(e => {
        expect(e.config.method).toEqual('get')
        expect(e.config.url).toEqual(validateTokenAuthUrl)
        done()
      })
    })
  })

  describe(".logout", () => {
    it("sends post request", done => {
      mock.onDelete(signOutAuthUrl).reply(200, {})

      configuredAuth.logout().then(e => {
        expect(e.config.method).toEqual('delete')
        expect(e.config.url).toEqual(signOutAuthUrl)
        done()
      })
    })
  })
})