"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientCredentialValidator = void 0;
class ClientCredentialValidator {
    static validate(credential) {
        for (const [key, value] of Object.entries(credential)) {
            if (!value) {
                throw new Error(`Required ${key} cannot be empty`);
            }
        }
    }
}
exports.ClientCredentialValidator = ClientCredentialValidator;
