// HTTP Status Codes
const SC400 = 400;
const SC401 = 401;
const SC404 = 404;
const SC500 = 500;
const SC200 = 200;

// AWS Config
const AWS_REGION = "us-east-1";
const AWS_ACCESS_KEY_ID = "ASIARQZ5T3L2NKAWP77H";
const AWS_SECRET_KEY = "3h/L8Yf/r5hsk+4We2460z72SuYJ3MF3DpqovO1W";
const AWS_SESSION_TOKEN = "FwoGZXIvYXdzEHYaDD0KCMSakKTDrD2e2SLEATLflmUfrgKP3MdGLnxVBueIR8fOpAY5mINMY54LzxEEJOPBK4leqi+dxjqdcL8jxUPMVs2A9CXhtyWuicBonDO48OSyEixRG1xylorLWv87HIp9IBIdetzxHmCF1Uzl0lSXXKosEcvYi64myhLmtvXVbFpYNCFztfzkHq1CQBGFhoObbOzf/aEtVLuaxn7H6dWI+FpUgbhtRjlI5UlUTTkfqQGbiN4MsEGhq/hoh6s2GzB82b3DHmw5jahBd966fMxTouYotK+mjQYyLd1RUdoc4Lq1HhpNKx+Z+uP33rp0tfkHy+nTYcOHZlCC9rUJxWr2ZuwUfXhIyA==";
const AWS_TOPIC = "arn:aws:sns:us-east-1:104819055348:OrderTopic";

// JWT Secret
const JWT_SECRET = "Pharmacy";

// App Constants
const CUSTOMER = "customer";
const OWNER = "owner";

const RECEIVE_ORDER_MESSAGE = "You have received order for following items: \n";
const PLACE_ORDER_MESSAGE = "You have placed order for following items: \n";
const THANK_MESSAGE = "Thank you for using Farmacy! Have a good Day!"

const APP_MAIL_ID = "farmacystoree@gmail.com";
const APP_MAIL_PASSWORD = "Farmacy@123";
const APP_MAIL_SUBJECT = "Order received on Farmacy";
const APP_MAIL_FORGOT_PASSWORD = "Password Resetted";
const APP_MAIL_PROVIDER = "gmail";

module.exports = {
    SC200,
    SC400,
    SC401,
    SC404,
    SC500,
    AWS_REGION,
    AWS_ACCESS_KEY_ID,
    AWS_SECRET_KEY,
    AWS_SESSION_TOKEN,
    AWS_TOPIC,
    JWT_SECRET,
    CUSTOMER,
    OWNER,
    RECEIVE_ORDER_MESSAGE,
    PLACE_ORDER_MESSAGE,
    THANK_MESSAGE,
    APP_MAIL_ID,
    APP_MAIL_PASSWORD,
    APP_MAIL_PROVIDER,
    APP_MAIL_SUBJECT,
    APP_MAIL_FORGOT_PASSWORD
}