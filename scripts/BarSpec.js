describe("Bar", function() {
    it("clear bar", function() {
        clearBar();
        expect(document.getElementById('addBar').className).toEqual("w3-bar-item w3-button w3-padding");
        expect(document.getElementById('serverBar').className).toEqual("w3-bar-item w3-button w3-padding");
        expect(document.getElementById('statBar').className).toEqual("w3-bar-item w3-button w3-padding");
        expect(document.getElementById('monitorBar').className).toEqual("w3-bar-item w3-button w3-padding");
    });
});
describe("monitor", function() {
    it("set name and param", function() {
        var parent = document.createElement("div");
        createInfoElem(parent,"name","param");
        expect(parent.childNodes[0].childNodes[0].innerHTML).toEqual("name");
        expect(parent.childNodes[0].childNodes[1].innerHTML).toEqual("param");
    });
});
