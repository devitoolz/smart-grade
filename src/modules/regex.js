const checkValidDate = value => {
  const validDateRegex =
    /^(?=\d)(?:(?:31(?!.(?:0?[2469]|11))|(?:30|29)(?!.0?2)|29(?=.0?2.(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00)))(?:\x20|$))|(?:2[0-8]|1\d|0?[1-9]))([-./])(?:1[012]|0?[1-9])\1(?:1[6-9]|[2-9]\d)?\d\d(?:(?=\x20\d)\x20|$))?(((0?[1-9]|1[012])(:[0-5]\d){0,2}(\x20[AP]M))|([01]\d|2[0-3])(:[0-5]\d){1,2})?$/;
  const dateRegex = /^(\d{4})-(\d{2})-(\d{2})$/g;
  const date = value.split('-');
  const year = parseInt(date[0]);
  const month = parseInt(date[1]);
  const day = parseInt(date[2]);
  const result = validDateRegex.test(`${day}-${month}-${year}`) && dateRegex.test(value);
  return result;
};

const checkValidPhone = value => {
  const validPhoneRegex = /^(\d{3})-(\d{4})-(\d{4})$/g;
  const result = validPhoneRegex.test(value);
  return result;
};

const checkValidEmail = value => {
  const validEmailRegex =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  const result = validEmailRegex.test(value);
  return result;
};

export { checkValidDate, checkValidPhone, checkValidEmail };
