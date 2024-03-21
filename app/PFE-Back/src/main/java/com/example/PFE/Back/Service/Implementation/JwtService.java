package com.example.PFE.Back.Service.Implementation;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {

    private static final  String SECRET_KEY="c4a2f8d0e5b31a7b9c8d3e2f1a6b4c9a8f3e2d1c4b9a8c3d2e1f4a7b6c5a8b9";
    public String extractUsername( String token) {
        return extractClaim(token,Claims::getSubject);
    }

    public <T> T extractClaim (String token , Function<Claims,T> claimsResolver){
        final Claims claims = extractAllClaims(token);
                return claimsResolver.apply(claims);
    }

    public String generateToken(UserDetails userDetails){
        return generateToken( new HashMap<>(), userDetails);
    }

    public String generateToken (Map<String , Object> extractClaims , UserDetails userDetails){
        return Jwts
                .builder()
                .setClaims(extractClaims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis()+1000*60*60))
                .signWith(getSignInKey(),
                SignatureAlgorithm.HS256)
                .compact();

    }
    public boolean isTokenValid(String token , UserDetails userDetails){
       final String userName = extractUsername(token);

        return (userName.equals(userDetails.getUsername())) && !isTokenExpired(token);

    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration( String token) {
        return extractClaim(token,Claims::getExpiration);
    }

    private Claims extractAllClaims(String token){

        return Jwts
                .parserBuilder()
                .setSigningKey(getSignInKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    private Key getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
