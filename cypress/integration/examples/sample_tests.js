describe("Testing form inputs", ()=>{
    beforeEach(()=>{
        cy.visit("http://localhost:3000/pizza");
    })
    it("visits localhost", () => {
        cy
        .get('input[name="name"]')
        .type("Aaron")
        .should("have.value","Aaron")

        cy
        .get('[type="checkbox"]')
        .check()
        .should("be.checked")

        cy
        .get('form[name="orderForm"]')
        .submit()
    })
})
