enum PasswordRequirement {
    UPPERCASE = "At least one uppercase letter",
    LOWERCASE = "At least one lowercase letter",
    DIGIT = "At least one digit",
    SPECIAL_CHAR = "At least one special character (@#$%^&+=!)",
    LENGTH = "Minimum length of 8 characters",
}

export type TPasswordValidationResult = {
    isValid: boolean;
    unmetRequirements: PasswordRequirement[];
};

/**
 * Validates a password against a set of requirements.
 *
 * The password must meet the following criteria:
 * - Contain at least one uppercase letter
 * - Contain at least one lowercase letter
 * - Contain at least one digit
 * - Contain at least one special character from the set [@#$%^&+=!]
 * - Minimum length of 8 characters
 */
export function validatePassword(password: string): TPasswordValidationResult {
    const requirements: Record<PasswordRequirement, boolean> = {
        [PasswordRequirement.UPPERCASE]: /[A-Z]/.test(password),
        [PasswordRequirement.LOWERCASE]: /[a-z]/.test(password),
        [PasswordRequirement.DIGIT]: /\d/.test(password),
        [PasswordRequirement.SPECIAL_CHAR]: /[@#$%^&+=!]/.test(password),
        [PasswordRequirement.LENGTH]: password.length >= 8,
    };

    const unmetRequirements = Object.keys(requirements)
        .filter((requirement) => !requirements[requirement as PasswordRequirement])
        .map((requirement) => requirement as PasswordRequirement);

    return {
        isValid: unmetRequirements.length === 0,
        unmetRequirements,
    };
}