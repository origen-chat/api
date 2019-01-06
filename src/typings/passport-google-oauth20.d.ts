/* eslint import/no-unresolved: [2, { ignore: ['passport-google-oauth$']}] */

declare module 'passport-google-oauth20' {
  import {
    IOAuth2StrategyOption,
    IOAuth2StrategyOptionWithRequest,
    OAuth2Strategy,
    Profile,
  } from 'passport-google-oauth';

  export {
    OAuth2Strategy as default,
    OAuth2Strategy as Strategy,
    IOAuth2StrategyOption,
    IOAuth2StrategyOptionWithRequest,
    Profile,
  };
}
