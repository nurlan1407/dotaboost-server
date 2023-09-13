import { UserDTO, tokenService } from "./tokenService";
import { tokenPayload,differentTokenPayload } from "./tokenFixtures";



describe("unit test for jwt token service", ()=>{
    describe("returning a json webtoken payload",()=>{
        it("should be correct", ()=>{
            const {accessToken,refreshToken} = tokenService.signTokens(tokenPayload._id, tokenPayload.email);
            const accessTokenPayload = tokenService.decodeAccessToken(accessToken);
            const {email, _id} = accessTokenPayload as UserDTO
            const refreshTokenPayload = tokenService.decodeAccessToken(refreshToken);
            expect({email:email, _id:_id}).toEqual(tokenPayload);
           
        })
        it("should be incorrect", ()=>{
            const {accessToken,refreshToken} = tokenService.signTokens(tokenPayload._id, tokenPayload.email);
            const accessTokenPayload = tokenService.decodeAccessToken(accessToken);
            const refreshTokenPayload = tokenService.decodeAccessToken(refreshToken);
            expect(accessTokenPayload).not.toEqual(tokenPayload);
            expect(refreshTokenPayload).not.toEqual(tokenPayload);
        })
    })
})