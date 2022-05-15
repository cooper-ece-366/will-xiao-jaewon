package edu.cooper.ece366.project.dove.server;

import org.springframework.http.MediaType;
//import org.springframework.stereotype.Controller;
        import org.springframework.web.bind.annotation.RequestMapping;
        import org.springframework.web.bind.annotation.RequestMethod;
        import org.springframework.web.bind.annotation.ResponseBody;
        import org.springframework.web.bind.annotation.RestController;

        import javax.servlet.http.HttpServletRequest;

// Reference: exempli-gratia
// Edited by Xiao Lin

@RestController
public class ControllerClientIPAddress {
    @RequestMapping(
            method = RequestMethod.GET,
            value = "/api/ipaddr",
            produces = MediaType.TEXT_PLAIN_VALUE
    )
    @ResponseBody
    public String getClientIPAddress(HttpServletRequest request) {
        String ip = HttpUtils.getRequestIP(request);
        return "Client IP Address: " + ip;
    }
}
