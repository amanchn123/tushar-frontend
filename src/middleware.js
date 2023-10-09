import { NextResponse,NextRequest } from 'next/server'


export function middleware(request) {

    const checkAdmin=request.cookies.get("AdminDetails")

    if(checkAdmin==null || checkAdmin==undefined){
    return NextResponse.redirect(new URL('/auth/Adminlogin', request.url))
    }

}
 
// Supports both a single string value or an array of matchers
export const config = {
  matcher: ['/AdminpostUpload'],
}