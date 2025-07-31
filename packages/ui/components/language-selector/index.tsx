import {Dropdown, Paragraph} from '@digdir/designsystemet-react';
import {GlobeIcon} from '@navikt/aksel-icons';

export function LanguageSelector() {
  return (
    <Dropdown.TriggerContext>
      <Dropdown.Trigger
        data-size="xs"
        variant="secondary"
      >
        <GlobeIcon />
        <Paragraph>Language</Paragraph>
      </Dropdown.Trigger>
      <Dropdown
        data-color="neutral"
        data-size="sm"
      >
        <Dropdown.List>
          <Dropdown.Item>
            <Dropdown.Button>Norsk bokmål</Dropdown.Button>
          </Dropdown.Item>
          <Dropdown.Item>
            <Dropdown.Button>English</Dropdown.Button>
          </Dropdown.Item>
        </Dropdown.List>
      </Dropdown>
    </Dropdown.TriggerContext>
  );
}
