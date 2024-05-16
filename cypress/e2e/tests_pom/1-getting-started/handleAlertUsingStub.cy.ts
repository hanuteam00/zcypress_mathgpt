describe('Handling JavaScript Alerts', () => {
    //cy.stub để giả lập hàm window.alert trong ngữ cảnh của trang web. 
    //Sau đó, khi nút được nhấp, cảnh báo sẽ được gọi và chúng ta sử dụng cy.get('@windowAlert')
    //để chờ cho việc gọi cảnh báo và xác nhận rằng nó đã được gọi với đúng thông báo.
    it('Handles JavaScript Alert 1', () => {
        // Visit the page
        cy.visit('https://the-internet.herokuapp.com/javascript_alerts')

        // Stub the window alert function
        cy.window().then(win => {
            cy.stub(win, 'alert').as('windowAlert')
        })

        // Click on the button to trigger the  alert
        cy.contains('Click for JS Alert').click()

        // Wait for the alert to be called and assert its message
        cy.get('@windowAlert').should('be.calledWith', 'I am a JS Alert')
    })

    it('Handles JavaScript Alert 2', () => {
        //cy.on để lắng nghe sự kiện window:alert.
        //Khi cảnh báo được gọi, chúng ta xác nhận rằng thông báo nhận được trong cảnh báo là đúng.
        // Visit the page
        cy.visit('https://the-internet.herokuapp.com/javascript_alerts')

        // Listen for the window:alert event
        cy.on('window:alert', (message) => {
            // Assert the message received in the alert
            expect(message).to.equal('I am a JS Alert')
        })

        // Click on the button to trigger the alert
        cy.contains('Click for JS Alert').click()
    })
})