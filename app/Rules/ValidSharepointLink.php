<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class ValidSharepointLink implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (strpos($value, 'hauph-my.sharepoint.com') === false) {
            $fail("The {$attribute} must be a valid SharePoint link from hauph-my.sharepoint.com.");
        }
    }
}
