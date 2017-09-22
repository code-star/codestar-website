// get selected locale setting from meta language tag
export function getLanguage() {
  return document
    .querySelector('meta[http-equiv="language"]')
    .getAttribute('content')
}
