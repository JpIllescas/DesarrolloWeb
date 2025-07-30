module.exports = {
  HOST: "ep-calm-heart-afmwqjq3.c-2.us-west-2.aws.neon.tech",
  USER: "neondb_owner",
  PASSWORD: "npg_Mb56uUsRAEDg",
  DB: "BDO",
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};