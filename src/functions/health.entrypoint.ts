// ----------------------------------------------------------------------------
// Purpose: Health check endpoint
// this is a simple endpoint that returns a status of "UP" to indicate that the
// service is running and ready to accept requests, the shell transformer will
// use this endpoint to determine if the transformer is ready to accept requests
// ----------------------------------------------------------------------------

export default async function() {
  return {
    status: "UP",
  };
}