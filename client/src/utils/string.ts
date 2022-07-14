/* eslint no-useless-escape: 0 */

export const stringUtils = {
  linkify (inputText: string) {
    let replacedText, replacePattern1, replacePattern2, replacePattern3;

    // URLs starting with http://, https://, or ftp://
    // eslint-disable-next-line prefer-const
    replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
    replacedText = inputText.replace(replacePattern1, '<a href="$1" target="_blank">$1</a>');

    // URLs starting with "www." (without // before it, or it'd re-link the ones done above).
    // eslint-disable-next-line prefer-const
    replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
    replacedText = replacedText.replace(replacePattern2, '$1<a href="http://$2" target="_blank">$2</a>');

    // Change email addresses to mailto:: links.
    // eslint-disable-next-line prefer-const
    replacePattern3 = /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim;
    replacedText = replacedText.replace(replacePattern3, '<a href="mailto:$1">$1</a>');

    return replacedText;
  },
  replaceAt (text: string, replacement: string, charAt: number) {
    const temp = text.split('');
    temp[charAt] = replacement;
    return temp.join('');
  },
};
