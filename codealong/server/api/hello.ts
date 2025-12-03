export default defineEventHandler(() => {
  return {
    message: "Hei fra API-et!",
    time: new Date().toISOString()
  };
});