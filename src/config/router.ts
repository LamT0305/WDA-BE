import routes from "../routes/index";

const route = (app: any) => {
  app.use("/api/v1/order", routes.order);
};

export default route