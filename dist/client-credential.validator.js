"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CredentialValidator = void 0;
class CredentialValidator {
    static validate(credential) {
        for (const [key, value] of Object.entries(credential)) {
            if (!value) {
                throw new Error(`Required ${key} cannot be empty`);
            }
        }
    }
}
exports.CredentialValidator = CredentialValidator;
