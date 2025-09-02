import {Button} from '@digdir/designsystemet-react';

interface SignInProps {
  dataSize?: 'xs' | 'sm' | 'md' | 'lg';
  onClick: () => any;
}

import {PersonIcon} from '@navikt/aksel-icons';

export function SignIn({dataSize = 'md', onClick}: SignInProps) {
  return (
    <Button
      data-size={dataSize}
      onClick={onClick}
    >
      <PersonIcon />
      Logg inn
    </Button>
  );
}
