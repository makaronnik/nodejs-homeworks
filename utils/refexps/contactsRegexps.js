const nameRegexp = /^[\p{Script=Latin}\p{Script=Cyrillic}\s]*$/u;
const phoneRegexp = /^[0-9 ()+-]+$/;
const emailRegexp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

module.exports = {
  nameRegexp,
  phoneRegexp,
  emailRegexp,
};
