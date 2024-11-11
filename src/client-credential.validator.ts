
import { IProviderCredential } from "./definition";

export class CredentialValidator {
    public static validate(credential: IProviderCredential): void {
        for (const [key, value] of Object.entries(credential)) {
            if (!value) {
                throw new Error(`Required ${key} cannot be empty`);
            }
        }
    }
}
