'use client';

import React, { useState } from 'react';

import { EyeClosedRegular, EyeRegular } from '../../icons';
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '../primitives/input-group';

type PasswordInputProps = Omit<React.ComponentProps<'input'>, 'type'>;

const PasswordInput = ({ className, disabled, ref, ...props }: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <InputGroup className={className}>
      <InputGroupInput {...props} ref={ref} disabled={disabled} type={showPassword ? 'text' : 'password'} />
      <InputGroupAddon align="inline-end">
        <InputGroupButton
          size="icon-xs"
          disabled={disabled}
          onClick={() => setShowPassword((prev) => !prev)}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
          tabIndex={-1}
        >
          {showPassword ? <EyeClosedRegular /> : <EyeRegular />}
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  );
};

PasswordInput.displayName = 'PasswordInput';

export { PasswordInput };
