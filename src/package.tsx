import React from 'react';
import { Action, ActionPanel, Form } from "@raycast/api";
import translate from "@vitalets/google-translate-api";
import debounce from 'debounce';


const TranslateForm = () => {
  const [text, setText] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [translated, setTranslated] = React.useState<Pick<translate.ITranslateResponse, 'text' | 'pronunciation'>>({
    text: '',
    pronunciation: '---',
  });

  const doTranslate = React.useMemo(() => {
    const _translate = debounce((text: string) => {
      translate(text, {
        from: 'en',
        to: 'uk',
      }).then(setTranslated).then(() => {
        setIsLoading(false);
      })
    }, 1000);

    return (text?: string) => {
      if (text) {
        setIsLoading(true);
        _translate(text)
      } else {
        setTranslated({
          text: '',
          pronunciation: '',
        });
      }
    };
  }, []);

  React.useEffect(() => {
    doTranslate(text);
  }, [text])

  return (
    <Form
      isLoading={isLoading}
      actions={(
        <ActionPanel title="Translation">
          <Action.CopyToClipboard title="Copy translation" content={translated?.text} />
        </ActionPanel>
      )}
    >
      <Form.TextArea id="text" title="Text" value={text} onChange={setText} />
      <Form.Dropdown id="language_from" title="From" defaultValue="uk" storeValue>
        <Form.Dropdown.Item value="en" title="English" icon="🇺🇸" />
        <Form.Dropdown.Item value="uk" title="Ukraine" icon="🇺🇦" />
      </Form.Dropdown>
      <Form.Dropdown id="language_to" title="To" defaultValue="en" storeValue>
        <Form.Dropdown.Item value="en" title="English" icon="🇺🇸" />
        <Form.Dropdown.Item value="uk" title="Ukraine" icon="🇺🇦" />
      </Form.Dropdown>
      <Form.TextArea id="result" title="Translation" value={translated?.text} placeholder="Translation" />
    </Form>
  );
}


export default TranslateForm;