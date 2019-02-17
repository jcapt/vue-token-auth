import {
  setToken,
  getToken,
  clearToken,
  loginParamsExist,
  findCredentialsInURI,
  defaultCredentials
} from "@/api/storage/token"

const credentials = {
  "expiry": "expiry-value",
  "token-type": "token-type-value",
  "access-token": "access-token-value",
  "client": "client-value",
  "uid": "uid-value"
}

afterAll(() => {
  localStorage.clear()
})

describe("localStorage manager", () => {
  describe(".setToken", () => {
    describe("with default creds", () => {
      it("saves token in localStorage", () => {
        setToken(credentials)

        defaultCredentials.filter((cred) => {
          expect(localStorage.getItem(cred)).toEqual(credentials[cred])
        })
      })
    })

    describe("with non-default creds", () => {
      it("saves token in localStorage", () => {
        const customCredentials = Object.assign({}, credentials)
        customCredentials["custom"] = "custom"

        setToken(customCredentials)

        defaultCredentials.filter((cred) => {
          expect(localStorage.getItem(cred)).toEqual(customCredentials[cred])
        })
      })
    })
  })

  describe(".getToken", () => {
    describe("with default creds", () => {
      it("gets token from localStorage", () => {
        setToken(credentials)

        let token = getToken()

        expect(token).toBeInstanceOf(Object)
        defaultCredentials.filter((cred) => {
          expect(token[cred]).toEqual(credentials[cred])
        })
      })
    })
  })

  describe("loginParamsExist", () => {
    it("checks if params exist in empty storage", () => {
      localStorage.clear()

      expect(loginParamsExist()).toEqual(false)
    })

    it("checks if params exist in non-empty storage", () => {
      setToken(credentials)

      expect(loginParamsExist()).toEqual(true)
    })
  })
})