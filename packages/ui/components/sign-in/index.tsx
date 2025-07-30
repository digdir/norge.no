import {Button} from '@digdir/designsystemet-react';

interface SignInProps {
  dataSize?: 'xs' | 'sm' | 'md' | 'lg';
}

import {PersonIcon} from '@navikt/aksel-icons';

export function SignIn({dataSize = 'md'}: SignInProps) {
  return (
    <Button data-size={dataSize}>
      <PersonIcon />
      Logg inn
    </Button>
  );
}
