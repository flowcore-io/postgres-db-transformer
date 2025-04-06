# Changelog

## [1.4.3](https://github.com/flowcore-io/postgres-db-transformer/compare/v1.4.2...v1.4.3) (2025-04-06)


### Bug Fixes

* **workflows:** :sparkles: Upgrade upload-artifact action to v4 ([004d039](https://github.com/flowcore-io/postgres-db-transformer/commit/004d039a04079fbbe559207b1efb76b38d72f584))

## [1.4.2](https://github.com/flowcore-io/postgres-db-transformer/compare/v1.4.1...v1.4.2) (2025-04-06)


### Bug Fixes

* **workflows:** :sparkles: Update artifact upload process in build workflow ([9ab07de](https://github.com/flowcore-io/postgres-db-transformer/commit/9ab07de978f9060d30c6bab8ef5225f0589008f8))

## [1.4.1](https://github.com/flowcore-io/postgres-db-transformer/compare/v1.4.0...v1.4.1) (2025-04-06)


### Bug Fixes

* New build ([039516b](https://github.com/flowcore-io/postgres-db-transformer/commit/039516b0529650939a27353eb883290a0f309a68))

## [1.4.0](https://github.com/flowcore-io/postgres-db-transformer/compare/v1.3.1...v1.4.0) (2024-11-11)


### Features

* Added possibility to require that a field is set ([142e979](https://github.com/flowcore-io/postgres-db-transformer/commit/142e979c1fc8cffda2908eebb94972dc45046a47))

## [1.3.1](https://github.com/flowcore-io/postgres-db-transformer/compare/v1.3.0...v1.3.1) (2024-06-27)


### Bug Fixes

* NaN bug ([bc43230](https://github.com/flowcore-io/postgres-db-transformer/commit/bc43230c68bb1a6dea703f0e47c0e47bc89e00f7))

## [1.3.0](https://github.com/flowcore-io/postgres-db-transformer/compare/v1.2.1...v1.3.0) (2024-05-15)


### Features

* Added a generic logger ([51d8778](https://github.com/flowcore-io/postgres-db-transformer/commit/51d877890e52e05aa20ea316e3de3cd9bc5409c3))

## [1.2.1](https://github.com/flowcore-io/postgres-db-transformer/compare/v1.2.0...v1.2.1) (2024-05-15)


### Bug Fixes

* Added required config ([7ac09c8](https://github.com/flowcore-io/postgres-db-transformer/commit/7ac09c8009cf6424f142596e363cea4bc7f7864a))
* COnvert integers ([074b2da](https://github.com/flowcore-io/postgres-db-transformer/commit/074b2dae6885f769cee3130a1421944059d58f68))
* Made less verbose ([8663e65](https://github.com/flowcore-io/postgres-db-transformer/commit/8663e65cd07ca55c818604c06def4f8c73674337))

## [1.2.0](https://github.com/flowcore-io/postgres-db-transformer/compare/v1.1.2...v1.2.0) (2024-04-10)


### Features

* Extended MATCH_KEY to auto populate associated column as primary column ([58b1589](https://github.com/flowcore-io/postgres-db-transformer/commit/58b158988c98d43ecefcaa000a05b317fbfffdc5))
* Extended table and schema definition to support primary keys ([1dc8356](https://github.com/flowcore-io/postgres-db-transformer/commit/1dc835639f421297dd537f30125accfd734c1b28))
* Update record functionality with unique keys ([5cc8c6a](https://github.com/flowcore-io/postgres-db-transformer/commit/5cc8c6a45af55275f3bd200ff194ef3618d0cf00))

## [1.1.2](https://github.com/flowcore-io/postgres-db-transformer/compare/v1.1.1...v1.1.2) (2024-04-05)


### Bug Fixes

* now able to construct big integer and date time as expected ([2ed70ea](https://github.com/flowcore-io/postgres-db-transformer/commit/2ed70eaa90af24888371c1590266287ae83eafcf))

## [1.1.1](https://github.com/flowcore-io/postgres-db-transformer/compare/v1.1.0...v1.1.1) (2024-04-02)


### Bug Fixes

* upgrades decimal type to double if it exceeds the decimal limit ([b9a8b0f](https://github.com/flowcore-io/postgres-db-transformer/commit/b9a8b0f26f29d2eb5534c2de4e757118fe091b8b))

## [1.1.0](https://github.com/flowcore-io/postgres-db-transformer/compare/v1.0.1...v1.1.0) (2024-04-02)


### Features

* added mapFrom schema feature, and additional types ([55fd704](https://github.com/flowcore-io/postgres-db-transformer/commit/55fd7045c07145717bb399b51154ebed1b972c2f))


### Bug Fixes

* removed cluttering console log ([a335570](https://github.com/flowcore-io/postgres-db-transformer/commit/a335570ca2d29c4676f61d8c7ab7f9bb4b7d08bf))
* table is now being dropped properly when flag CLEAR_TABLE_ON_START is true ([44585b1](https://github.com/flowcore-io/postgres-db-transformer/commit/44585b10cddf8a5985dc799c089440fa3a0d7008))
* using json type for objs when schema is not defined ([a850e3f](https://github.com/flowcore-io/postgres-db-transformer/commit/a850e3fe3e0169f80b6102f89b74f506c836d61f))

## [1.0.1](https://github.com/flowcore-io/postgres-db-transformer/compare/v1.0.0...v1.0.1) (2024-04-02)


### Bug Fixes

* corrected package name ([7f50911](https://github.com/flowcore-io/postgres-db-transformer/commit/7f509119355957a4450db6b4b458a0fcae0dd42a))

## 1.0.0 (2024-04-02)


### Features

* added a dynamic pg table generation and insertion ([a54d1c2](https://github.com/flowcore-io/postgres-db-transformer/commit/a54d1c2e9a0c8cce0176e9f40af8dc9e6a07622d))

## [2.0.0](https://github.com/flowcore-io/nodejs-typescript-transformer-example/compare/v1.3.1...v2.0.0) (2023-10-24)


### ⚠ BREAKING CHANGES

* updated example transformer to use new transformer shell v 2.x

### Features

* updated example transformer to use new transformer shell v 2.x ([4c457f9](https://github.com/flowcore-io/nodejs-typescript-transformer-example/commit/4c457f967b90707f3c916daa182ee947900ec997))

## [1.3.1](https://github.com/flowcore-io/nodejs-typescript-transformer-example/compare/v1.3.0...v1.3.1) (2023-10-04)


### Bug Fixes

* fixed eventid and validtime return ([3872cf7](https://github.com/flowcore-io/nodejs-typescript-transformer-example/commit/3872cf7ae0fdd518216d549c410d674adab2013b))
* us a non-flowcore related environment variable name ([52114f7](https://github.com/flowcore-io/nodejs-typescript-transformer-example/commit/52114f7682c02c884edd5dfd415c17bb32b8a8d6))

## [1.3.0](https://github.com/flowcore-io/nodejs-typescript-transformer-example/compare/v1.2.0...v1.3.0) (2023-09-12)


### Features

* simplified mounting, install production dependencies if package.json is present in dist. ([9b242d5](https://github.com/flowcore-io/nodejs-typescript-transformer-example/commit/9b242d536aa24ff5eedb00737cf70e1a52bdf384))
* updated docs ([a5303ae](https://github.com/flowcore-io/nodejs-typescript-transformer-example/commit/a5303aecabf3b68610b739445e846c0f0e211894))


### Bug Fixes

* added docker ignore ([63f4225](https://github.com/flowcore-io/nodejs-typescript-transformer-example/commit/63f4225e98347906fc93341234e9a3b2e8352bbf))
* added outputs to test ([37fd3f7](https://github.com/flowcore-io/nodejs-typescript-transformer-example/commit/37fd3f743a5625ddc465a8b670bd3cb898d8e9be))
* added outputs to test ([0d1f3cf](https://github.com/flowcore-io/nodejs-typescript-transformer-example/commit/0d1f3cfdbf1dec01fbba5ca659e84612628eb760))
* added outputs to test ([602a3c9](https://github.com/flowcore-io/nodejs-typescript-transformer-example/commit/602a3c936923c35d9511ff5cdaa001a2ee3e66cf))
* added outputs to test ([5302397](https://github.com/flowcore-io/nodejs-typescript-transformer-example/commit/53023970fa74c9c0e88af5df09a0bf86c41134ec))
* added outputs to test ([87d1c36](https://github.com/flowcore-io/nodejs-typescript-transformer-example/commit/87d1c364f0a68a9b2339e3e21d887e5b9e5a4cf7))
* bumped transformer shell to 1.4.2 ([eedb1d7](https://github.com/flowcore-io/nodejs-typescript-transformer-example/commit/eedb1d7f8b4d4e1f746ab83c302c1951670e9d45))
* bumped transformer shell to 1.4.2 ([34b8d9e](https://github.com/flowcore-io/nodejs-typescript-transformer-example/commit/34b8d9e1ce3a58ed75b38f6269ba3f5598575b74))
* bumped transformer shell to 1.4.3 changed docker compose file ([2ca7b6d](https://github.com/flowcore-io/nodejs-typescript-transformer-example/commit/2ca7b6d417e427243cb2975ed5bbe81dd4432b62))
* changed permissions on build directory before starting transformer shell ([58edf1c](https://github.com/flowcore-io/nodejs-typescript-transformer-example/commit/58edf1ce7dfc40db5337388ef581d0645a3dd944))
* set test receiver to use 40xxx range port to avoid conflicts ([9d6fe3e](https://github.com/flowcore-io/nodejs-typescript-transformer-example/commit/9d6fe3e7ebc3a572a67e59823c0e8102e6a321ab))
* updated readme ([4a7d138](https://github.com/flowcore-io/nodejs-typescript-transformer-example/commit/4a7d13873fa86d47c8f245ae2277f68751504926))
* updated test pipeline ([e17a051](https://github.com/flowcore-io/nodejs-typescript-transformer-example/commit/e17a05162c4cebe766192ad59621355470e9c5ee))

## [1.2.0](https://github.com/flowcore-io/nodejs-typescript-transformer-example/compare/v1.1.0...v1.2.0) (2023-08-31)


### Features

* streamlined DX with JSON configuration ([bd1f9b9](https://github.com/flowcore-io/nodejs-typescript-transformer-example/commit/bd1f9b94b7452020906f2c89da9d7def20ca551f))

## [1.1.0](https://github.com/flowcore-io/nodejs-typescript-transformer-example/compare/v1.0.6...v1.1.0) (2023-08-30)


### Features

* added tests ([ab4c8fc](https://github.com/flowcore-io/nodejs-typescript-transformer-example/commit/ab4c8fcca45cdcf6445973098a51a1284d8844b7))


### Bug Fixes

* added github host address ([c920023](https://github.com/flowcore-io/nodejs-typescript-transformer-example/commit/c92002352fcdcbe0b1f493649b8a74c9395dc3b5))
* added tests and lint to workflow ([ff09f9f](https://github.com/flowcore-io/nodejs-typescript-transformer-example/commit/ff09f9fa8961bb1973388e4157961ec420190738))
* added tests and lint to workflow ([329b13b](https://github.com/flowcore-io/nodejs-typescript-transformer-example/commit/329b13bcb26c98b89c2f7abb7cb13b64ef3b408c))

## [1.0.6](https://github.com/flowcore-io/nodejs-typescript-transformer-example/compare/v1.0.5...v1.0.6) (2023-08-30)


### Bug Fixes

* changed path to include zipped file ([b072fd5](https://github.com/flowcore-io/nodejs-typescript-transformer-example/commit/b072fd5068975b5349851f5e58e91a6f6f8fd77c))

## [1.0.5](https://github.com/flowcore-io/nodejs-typescript-transformer-example/compare/v1.0.4...v1.0.5) (2023-08-30)


### Bug Fixes

* exclude the dist folder path in the zip file ([9d20fc5](https://github.com/flowcore-io/nodejs-typescript-transformer-example/commit/9d20fc5ded7e3cb878af375ba26ba150954e6748))

## [1.0.4](https://github.com/flowcore-io/nodejs-typescript-transformer-example/compare/v1.0.3...v1.0.4) (2023-08-30)


### Bug Fixes

* added production node modules to dist before compressing artifact ([f683906](https://github.com/flowcore-io/nodejs-typescript-transformer-example/commit/f683906875f9f5e14287116a81cdfa5f51545bda))

## [1.0.3](https://github.com/flowcore-io/nodejs-typescript-transformer-example/compare/v1.0.2...v1.0.3) (2023-08-30)


### Bug Fixes

* added write permission ([04a64ef](https://github.com/flowcore-io/nodejs-typescript-transformer-example/commit/04a64efb0f8d65afde061adf76e491d07fc64b1f))

## [1.0.2](https://github.com/flowcore-io/nodejs-typescript-transformer-example/compare/v1.0.1...v1.0.2) (2023-08-30)


### Bug Fixes

* changed upload artifact release ([14b6b5a](https://github.com/flowcore-io/nodejs-typescript-transformer-example/commit/14b6b5a00fd60d9574e771c3dad433e7a08bd819))

## [1.0.1](https://github.com/flowcore-io/nodejs-typescript-transformer-example/compare/v1.0.0...v1.0.1) (2023-08-30)


### Bug Fixes

* added missing required asset name ([9944862](https://github.com/flowcore-io/nodejs-typescript-transformer-example/commit/99448623df2848e61c95c51015691f6972b05f79))

## 1.0.0 (2023-08-30)


### Features

* initial version ([3effd00](https://github.com/flowcore-io/nodejs-typescript-transformer-example/commit/3effd00370c99e8edf4a7f37ed73e6c180d3dae6))


### Bug Fixes

* switched to yarn locally ([5b6f17e](https://github.com/flowcore-io/nodejs-typescript-transformer-example/commit/5b6f17ef9a481f369850d3ad2be12644051ea9d1))
