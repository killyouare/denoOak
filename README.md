# Deno project

Mini shop

## Technology stack

 [TS](https://www.typescriptlang.org/) + [oak](https://deno.land/x/oak) +  [mongo](https://deno.land/x/mongo) + [djwt](https://deno.land/x/djwt) + [bcrypt](https://deno.land/x/bcrypt)

## installation

```bash
  git clone https://github.com/killyouare/denooak
  cd denooak/
```
install [deno](https://deno.land/) 
```bash
  deno --allow-net --allow-read app.ts
```

## Tests

Thunder client is used for testing(thunder-tests folder) or use the postman collection, it's inside thunder-tests folder

### Environment
Variable | value
------ | ------
host   | http://localhost:4000  

## Notes

to change the database from the cloud storage, use [mongo](https://deno.land/x/mongo) documentation


