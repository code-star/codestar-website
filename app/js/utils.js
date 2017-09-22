// get selected locale setting from meta language tag
export default function getLanguage() {
  return document
    .querySelector('meta[http-equiv="language"]')
    .getAttribute('content')
}
