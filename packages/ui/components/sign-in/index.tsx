import {Button} from '@digdir/designsystemet-react';
import { PersonIcon } from '@navikt/aksel-icons';

export function SignIn() {
  return (
    <Button data-size="xs">
      <PersonIcon />
      Logg inn
    </Button>
  );
}
