var customerModel = require("./customerModel");

module.exports.getAllCustomers = () => {
  return new Promise((resolve, reject) => {
    customerModel.find({}, (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
};

module.exports.registerCustomer = async (customerData) => {
  var cusModel = new customerModel();
  var newPassword = await cusModel.encryptPassword(customerData.password);
  return new Promise(async (resolve, reject) => {
    customerModel.insertMany(
      {
        customer_email: customerData.customer_email,
        customer_mobile: customerData.customer_mobile,
        password: newPassword,
      },
      (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      }
    );
  });
};

module.exports.loginCustomer = (loginData) => {
  return new Promise((resolve, reject) => {
    customerModel.findOne(
      { customer_email: loginData.customer_email },
      async (error, data) => {
        if (error) {
          reject(error);
        } else {
          if (data != undefined || data != null) {
            var cusModel = new customerModel();
            var validationStatus = await cusModel.validatePassword(
              loginData.password,
              data.password
            );
            if (validationStatus) {
              resolve({ status: true, message: "Login Success !" });
            } else {
              resolve({ status: true, message: "Invalid Password !" });
            }
          } else {
            resolve({ status: false, message: "Invalid Customer Email !" });
          }
        }
      }
    );
  });
};

module.exports.updatedCustomer = (cusData, id) => {
  return new Promise((resolve, reject) => {
    customerModel.updateOne(
      { _id: id },
      {
        $set: {
          customer_email: cusData.customer_email,
          customer_mobile: cusData.customer_mobile,
          password: cusData.password,
        },
      },
      (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      }
    );
  });
};

module.exports.removeCustomer = (id) => {
  return new Promise((resolve, reject) => {
    customerModel.deleteOne({ _id: id }, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
};

module.exports.singleCustomer = (id) => {
  return new Promise((resolve, reject) => {
    customerModel.find({ _id: id }, (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
};
