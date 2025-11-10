/**
 * @deprecated: drop in v5.0
 */
export function tuiIsValidUrl(url) {
    return new RegExp(String.raw `^([a-zA-Z]+:\/\/)?` + // protocol
        String.raw `((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|localhost|` + // domain name
        String.raw `((\d{1,3}\.){3}\d{1,3}))` + // OR IP (v4) address
        String.raw `(\:\d+)?(\/[-a-z\d%_.~+\:]*)*` + // port and path
        String.raw `(\?[)(;&a-z\d%_.~+=-]*)?` + // query string
        String.raw `(\#[-a-z\d_]*)?$`, // fragment locator
    'i').test(url);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXMtdmFsaWQtdXJsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2RrL3V0aWxzL21pc2NlbGxhbmVvdXMvaXMtdmFsaWQtdXJsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztHQUVHO0FBQ0gsTUFBTSxVQUFVLGFBQWEsQ0FBQyxHQUFXO0lBQ3JDLE9BQU8sSUFBSSxNQUFNLENBQ2IsTUFBTSxDQUFDLEdBQUcsQ0FBQSxvQkFBb0IsR0FBRyxXQUFXO1FBQ3hDLE1BQU0sQ0FBQyxHQUFHLENBQUEsd0RBQXdELEdBQUcsY0FBYztRQUNuRixNQUFNLENBQUMsR0FBRyxDQUFBLDBCQUEwQixHQUFHLHFCQUFxQjtRQUM1RCxNQUFNLENBQUMsR0FBRyxDQUFBLCtCQUErQixHQUFHLGdCQUFnQjtRQUM1RCxNQUFNLENBQUMsR0FBRyxDQUFBLDBCQUEwQixHQUFHLGVBQWU7UUFDdEQsTUFBTSxDQUFDLEdBQUcsQ0FBQSxrQkFBa0IsRUFBRSxtQkFBbUI7SUFDckQsR0FBRyxDQUNOLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ2hCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBkZXByZWNhdGVkOiBkcm9wIGluIHY1LjBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHR1aUlzVmFsaWRVcmwodXJsOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gbmV3IFJlZ0V4cChcbiAgICAgICAgU3RyaW5nLnJhd2BeKFthLXpBLVpdKzpcXC9cXC8pP2AgKyAvLyBwcm90b2NvbFxuICAgICAgICAgICAgU3RyaW5nLnJhd2AoKChbYS16XFxkXShbYS16XFxkLV0qW2EtelxcZF0pKilcXC4pK1thLXpdezIsfXxsb2NhbGhvc3R8YCArIC8vIGRvbWFpbiBuYW1lXG4gICAgICAgICAgICBTdHJpbmcucmF3YCgoXFxkezEsM31cXC4pezN9XFxkezEsM30pKWAgKyAvLyBPUiBJUCAodjQpIGFkZHJlc3NcbiAgICAgICAgICAgIFN0cmluZy5yYXdgKFxcOlxcZCspPyhcXC9bLWEtelxcZCVfLn4rXFw6XSopKmAgKyAvLyBwb3J0IGFuZCBwYXRoXG4gICAgICAgICAgICBTdHJpbmcucmF3YChcXD9bKSg7JmEtelxcZCVfLn4rPS1dKik/YCArIC8vIHF1ZXJ5IHN0cmluZ1xuICAgICAgICAgICAgU3RyaW5nLnJhd2AoXFwjWy1hLXpcXGRfXSopPyRgLCAvLyBmcmFnbWVudCBsb2NhdG9yXG4gICAgICAgICdpJyxcbiAgICApLnRlc3QodXJsKTtcbn1cbiJdfQ==