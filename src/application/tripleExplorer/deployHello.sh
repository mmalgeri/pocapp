curl  \
 --request PUT \
 --digest --user admin:admin \
 --upload-file ./helloNSPrefix.xqy \
 --header "Content-type: application/xquery" \
 "http://localhost:8020/v1/config/resources/helloWorldRestExtension?version=1.0&provider=Matthew Royal&description=Hello World test application&method=get&get:arg1=xs:string*"

