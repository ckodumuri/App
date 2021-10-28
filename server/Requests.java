import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.io.IOException;
import java.net.URI;
import java.time.Duration;
import java.net.http.HttpResponse.BodyHandlers;
import com.fasterxml.jackson.core.JsonParser;

class Requests{
    public String getInsuranceByTypeAndPlan(String[] params) throws IOException, InterruptedException {
        /* 
        Take in parameters: type, insurance provider, plan
        Returns JSON string of result
        */
        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create("https://postman-echo.com/get"))
            .headers("type", params[0], "insurance", params[1], "plan", params[2])
            .timeout(Duration.ofSeconds(10))
            .GET()
            .build();

        HttpClient client = HttpClient.newHttpClient();
        HttpResponse<String> response = client.send(request, BodyHandlers.ofString());

        return(response);
    }

};
