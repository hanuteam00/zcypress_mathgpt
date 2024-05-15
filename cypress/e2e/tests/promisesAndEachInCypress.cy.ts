//@ts-check
/// <reference types="cypress" />

/*
- `each()` được sử dụng để lặp qua các phần tử DOM và thực thi một số logic kiểm tra đối với mỗi phần tử.
- `forEach()` được sử dụng để lặp qua một mảng dữ liệu JSON và thi hành các hành động người dùng, chẳng hạn như điền và gửi biểu mẫu.
*/

describe("Data Driven Login Test", () => {
  let users: any; // Khai báo biến local để lưu trữ danh sách người dùng

  beforeEach(() => {
    cy.fixture("users").then((userData) => {
      users = userData; // Lưu danh sách người dùng vào biến local
    });
    cy.visit("https://dev.mathgpt.ai/login?role=educator");
  });

  it("should wait for different durations for each element", () => {
    //cy.wrap([1, 2, 3]): Dùng cy.wrap để chuyển mảng [1, 2, 3] thành một đối tượng mà Cypress có thể xử lý và thao tác
    /*
    - num: Đây là giá trị của phần tử hiện tại trong mảng. Trong trường hợp này, num chứa giá trị của từng phần tử trong mảng ([1, 2, 3]).
    - i: Đây là chỉ số của phần tử hiện tại trong mảng. Trong trường hợp này, i chứa chỉ số của từng phần tử trong mảng (0, 1, 2).
     array: Đây là mảng gốc mà bạn đang lặp qua. Đôi khi bạn có thể cần truy cập đến mảng gốc trong quá trình lặp. Trong trường hợp này, array chứa toàn bộ mảng ([1, 2, 3]).
    */

    //each: .each() của Cypress được thiết kế để hoạt động với một loạt các command Cypress trong mỗi vòng lặp. Nó tạo ra một chuỗi lệnh mà Cypress sẽ thực thi tuần tự cho mỗi phần tử trong mảng. Điều này có nghĩa là các lệnh bên trong hàm callback của .each() sẽ được thực hiện một cách tuần tự và đồng bộ với Cypress. Do đó, nếu bạn cần thực hiện các lệnh Cypress phức tạp hoặc chờ đợi các điều kiện xảy ra, .each() là sự lựa chọn tốt.
    //forEach: .forEach() là một phương thức JavaScript cơ bản, không phải là một phương thức của Cypress. Nó hoạt động bằng cách gọi một hàm callback cho mỗi phần tử trong mảng, nhưng nó không tạo ra một chuỗi lệnh Cypress để thực hiện như .each(). Thay vào đó, nó chỉ là một hàm JavaScript thông thường.

    // Sử dụng each trong Cypress
    // cy.wrap([1, 2, 3]).each((num, i, array) => {
    //     // Lệnh Cypress
    //     cy.log(`Element1 ${num} at index ${i}`);
    //     cy.visit('https://github.com/');
    // });

    // Sử dụng forEach trong JavaScript
    [1, 2, 3].forEach((num, i, array) => {
      // Hành động JavaScript thông thường
      console.log(`Element2 ${num} at index ${i}`);
      cy.visit("https://google.com/");
    });

    cy.wrap([1, 2, 3]).each((num: any, i, array) => {
      return new Cypress.Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, num * 1000);
      });
    });

    // // Sử dụng cy.wrap để xử lý mảng trong Cypress
    // cy.wrap(delays).each((delay, index) => {
    //     // In ra thông báo trước khi thực hiện hành động đợi
    //     cy.log(`Waiting for ${delay}ms for element ${index + 1}`);

    //     // Tạo một Promise mới, giữ trong thời gian delay
    //     return new Cypress.Promise((resolve) => {
    //         setTimeout(() => {
    //             // Sau khi thời gian delay, resolve Promise
    //             resolve();
    //         }, delay);
    //     });
    // });
  });

  it("TC2 - each() - should assert text of each button", () => {
    cy.visit("https://the-internet.herokuapp.com/forgot_password");
    cy.get("button").each(($el, index, $list) => {
      // $el là phần tử DOM hiện tại
      // index là chỉ số của phần tử trong mảng
      // $list là danh sách toàn bộ phần tử trả về trong cy.get('button')

      // Kiểm tra text mỗi nút, giả sử nút đầu tiên có text là "First", vv...
      const expectedTexts = ["Retrieve password"];
      expect($el.text().trim()).to.eq(expectedTexts[index]);
    });
  });

  it.only("TC3 - forEach() - should login with multiple accounts", () => {
    users.forEach((user: any) => {
      // Sử dụng biến local để truy cập danh sách người dùng
      cy.get("input[placeholder='Enter your email']").clear().type(user.email);
      cy.get("input[placeholder='Enter your password']")
        .clear()
        .type(user.password);
      //   cy.get("#submit").click();

      // Add your assertion here
      // cy.url().should("include", "/home");
    });
  });
});
