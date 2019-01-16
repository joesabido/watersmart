/**
 * Simple XML Parser
 * 
 * Takes an XML document and converts it to a collection of JS objects.
 */
class XmlParser{
    /**
     * Takes an XML string and returns a collection of objects matching the itemTagName parameter.
     * @param {string} xml 
     * @param {string} itemTagName 
     */

    static getItems(xml, itemTagName){
        /**
         * Initialize an empty array of items to return later.
         * Use the native DOMParser. Doesn't work on IE.
         * If IE is required, there are other libraries that can be used.
         */
        let items = []
        let parser = new DOMParser()
        let dom = parser.parseFromString(xml, 'text/xml')

        /** Extract the elements matching the TagName */
        let elements = dom.getElementsByTagName(itemTagName)
        
        
        /** For each of the elements, get the internal nodes and used them to build an object. */
        for(let itemCounter = 0; itemCounter < elements.length; itemCounter++){
            let attributes = elements[itemCounter].childNodes
            let item = {}
            
            /** Turn every internal node into an attribute of the object. */
            for(let attributeCounter = 0; attributeCounter < attributes.length; attributeCounter++){
                let attributeData = attributes[attributeCounter]
                item[attributeData.localName] = attributeData.innerHTML
            }

            /** Add the new item to the array */
            items.push(item)
        }

        return items
    }
}

export default XmlParser