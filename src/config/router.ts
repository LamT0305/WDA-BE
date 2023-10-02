import routes from "../routes/index";

const route = (app: any) => {
  app.use("/api/v1/order", routes.order);
  app.use("/api/v1/admin", routes.admin);
};

export default route;
