#include <glad/glad.h>
#include <GLFW/glfw3.h>

#include <iostream>
#include <fstream>
#include <string>

#include <my/BuildWindow.h>
#include <my/MyShader.h>

int _shader_1_main()
{
	GLFWwindow* window = createOpenGLWindow();

	float vertices[] = {
		0.0, 0.5, 0.0,
		-0.5, -0.5, 0.0,
		0.5, -0.5, 0.0
	};

	unsigned int VAO, VBO;
	glGenVertexArrays(1, &VAO);
	glBindVertexArray(VAO);
	glGenBuffers(1, &VBO);
	glBindBuffer(GL_ARRAY_BUFFER, VBO);
	glBufferData(GL_ARRAY_BUFFER, sizeof(vertices), vertices, GL_STATIC_DRAW);
	glVertexAttribPointer(0, 3, GL_FLOAT, GL_FALSE, 3 * sizeof(float), (void*)0);
	glEnableVertexAttribArray(0);

	//��ɫ��
	std::string vsPath = "E:/MyCode/openGL/openGL/work/ShaderFile/ShaderLearn/changeColor/vertex.vs";
	std::string fsPath = "E:/MyCode/openGL/openGL/work/ShaderFile/ShaderLearn/changeColor/fragment.fs";
	MyShader changeColorShader(vsPath.data(), fsPath.data());

	//ʹ����ɫ��
	changeColorShader.use();

	float time, greenValue;
	std::string ourColor = "ourColor";
	int location = glGetUniformLocation(changeColorShader.ID, ourColor.c_str());

	//ѭ������
	//���GLFW�Ƿ�Ҫ���˳�
	while (!glfwWindowShouldClose(window))
	{
		//���������Ļ��ɫ
		glClearColor(0.2f, 0.3f, 0.3f, 1.0f);
		//������壬��ߵĻ��廹��GL_DEPTH_BUFFER_BIT��GL_STENCIL_BUFFER_BIT
		glClear(GL_COLOR_BUFFER_BIT);

		time = glfwGetTime();
		greenValue = sin(time) / 2.0f + 0.5f;
		glUniform3f(location, 0.0f, greenValue, 0.0f);

		glDrawArrays(GL_TRIANGLES, 0, 3);

		//������ɫ����
		glfwSwapBuffers(window);
		//�����û�д����¼����������롢����ƶ���
		glfwPollEvents();
	}

	closeWindow();
	return 0;
}