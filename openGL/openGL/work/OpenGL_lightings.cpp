﻿/*
*聚光光源
*/
#include <glad/glad.h>
#include <GLFW/glfw3.h>

#include <iostream>
#include <fstream>
#include <string>

#include <my/BuildWindow.h>
#include <my/MyShader.h>
#include <my/MyCamera.h>

#define STB_IMAGE_IMPLEMENTATION
#include <img/stb_image.h>

#include <glm/glm.hpp>
#include <glm/gtc/matrix_transform.hpp>
#include <glm/gtc/type_ptr.hpp>

// camera
Camera myCamera(glm::vec3(0.0f, 0.0f, 3.0f));
float lastX = 800.0 / 2.0f;
float lastY = 600.0 / 2.0f;
bool firstMouse = true;
float deltaTime = 0.0f;	// time between current frame and last frame
float lastFrame = 0.0f;

void processInput(GLFWwindow* window)
{
	if (glfwGetKey(window, GLFW_KEY_ESCAPE) == GLFW_PRESS)
		glfwSetWindowShouldClose(window, true);
	if (glfwGetKey(window, GLFW_KEY_W) == GLFW_PRESS)
		myCamera.ProcessKeyboard(FORWARD, deltaTime);
	if (glfwGetKey(window, GLFW_KEY_S) == GLFW_PRESS)
		myCamera.ProcessKeyboard(BACKWARD, deltaTime);
	if (glfwGetKey(window, GLFW_KEY_A) == GLFW_PRESS)
		myCamera.ProcessKeyboard(LEFT, deltaTime);
	if (glfwGetKey(window, GLFW_KEY_D) == GLFW_PRESS)
		myCamera.ProcessKeyboard(RIGHT, deltaTime);
}

void mouse_callback(GLFWwindow* window, double xpos, double ypos)
{
	if (firstMouse)
	{
		lastX = xpos;
		lastY = ypos;
		firstMouse = false;
	}

	float xoffset = xpos - lastX;
	float yoffset = lastY - ypos; // reversed since y-coordinates go from bottom to top

	lastX = xpos;
	lastY = ypos;

	myCamera.ProcessMouseMovement(xoffset, yoffset);
}

// glfw: whenever the mouse scroll wheel scrolls, this callback is called
// ----------------------------------------------------------------------
void scroll_callback(GLFWwindow* window, double xoffset, double yoffset)
{
	myCamera.ProcessMouseScroll(yoffset);
}

int main()
{
	GLFWwindow* window = createOpenGLWindow();
	glfwSetCursorPosCallback(window, mouse_callback);
	glfwSetScrollCallback(window, scroll_callback);
	glEnable(GL_DEPTH_TEST);
	//启动光标
	glfwSetInputMode(window, GLFW_CURSOR, GLFW_CURSOR_DISABLED);

	//处理纹理
	unsigned int texture_1, texture_2;
	glGenTextures(1, &texture_1);
	glBindTexture(GL_TEXTURE_2D, texture_1);
	glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_S, GL_REPEAT);
	glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_T, GL_REPEAT);
	glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MAG_FILTER, GL_LINEAR);
	glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MIN_FILTER, GL_LINEAR);
	//读取纹理数据
	int width, height, colorChannelNum;
	std::string imgPath;
	imgPath = "./img/container2.png";
	unsigned char *data;
	data = stbi_load(imgPath.data(), &width, &height, &colorChannelNum, 0);
	if (data)
	{
		glTexImage2D(GL_TEXTURE_2D, 0, GL_RGBA, width, height, 0, GL_RGBA, GL_UNSIGNED_BYTE, data);
	}
	//生成以后记得释放
	stbi_image_free(data);

	glGenTextures(1, &texture_2);
	glBindTexture(GL_TEXTURE_2D, texture_2);
	glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_S, GL_REPEAT);
	glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_T, GL_REPEAT);
	glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MIN_FILTER, GL_LINEAR);
	glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MAG_FILTER, GL_LINEAR);
	imgPath = "./img/container2_specular.png";
	data = stbi_load(imgPath.data(), &width, &height, &colorChannelNum, 0);
	if (data)
	{
		glTexImage2D(GL_TEXTURE_2D, 0, GL_RGBA, width, height, 0, GL_RGBA, GL_UNSIGNED_BYTE, data);
	}
	stbi_image_free(data);

	float vertices[] = {
		// positions          // normals           // texture coords
		-0.5f, -0.5f, -0.5f,  0.0f,  0.0f, -1.0f,  0.0f,  0.0f,
		0.5f, -0.5f, -0.5f,  0.0f,  0.0f, -1.0f,  1.0f,  0.0f,
		0.5f,  0.5f, -0.5f,  0.0f,  0.0f, -1.0f,  1.0f,  1.0f,
		0.5f,  0.5f, -0.5f,  0.0f,  0.0f, -1.0f,  1.0f,  1.0f,
		-0.5f,  0.5f, -0.5f,  0.0f,  0.0f, -1.0f,  0.0f,  1.0f,
		-0.5f, -0.5f, -0.5f,  0.0f,  0.0f, -1.0f,  0.0f,  0.0f,

		-0.5f, -0.5f,  0.5f,  0.0f,  0.0f,  1.0f,  0.0f,  0.0f,
		0.5f, -0.5f,  0.5f,  0.0f,  0.0f,  1.0f,  1.0f,  0.0f,
		0.5f,  0.5f,  0.5f,  0.0f,  0.0f,  1.0f,  1.0f,  1.0f,
		0.5f,  0.5f,  0.5f,  0.0f,  0.0f,  1.0f,  1.0f,  1.0f,
		-0.5f,  0.5f,  0.5f,  0.0f,  0.0f,  1.0f,  0.0f,  1.0f,
		-0.5f, -0.5f,  0.5f,  0.0f,  0.0f,  1.0f,  0.0f,  0.0f,

		-0.5f,  0.5f,  0.5f, -1.0f,  0.0f,  0.0f,  1.0f,  0.0f,
		-0.5f,  0.5f, -0.5f, -1.0f,  0.0f,  0.0f,  1.0f,  1.0f,
		-0.5f, -0.5f, -0.5f, -1.0f,  0.0f,  0.0f,  0.0f,  1.0f,
		-0.5f, -0.5f, -0.5f, -1.0f,  0.0f,  0.0f,  0.0f,  1.0f,
		-0.5f, -0.5f,  0.5f, -1.0f,  0.0f,  0.0f,  0.0f,  0.0f,
		-0.5f,  0.5f,  0.5f, -1.0f,  0.0f,  0.0f,  1.0f,  0.0f,

		0.5f,  0.5f,  0.5f,  1.0f,  0.0f,  0.0f,  1.0f,  0.0f,
		0.5f,  0.5f, -0.5f,  1.0f,  0.0f,  0.0f,  1.0f,  1.0f,
		0.5f, -0.5f, -0.5f,  1.0f,  0.0f,  0.0f,  0.0f,  1.0f,
		0.5f, -0.5f, -0.5f,  1.0f,  0.0f,  0.0f,  0.0f,  1.0f,
		0.5f, -0.5f,  0.5f,  1.0f,  0.0f,  0.0f,  0.0f,  0.0f,
		0.5f,  0.5f,  0.5f,  1.0f,  0.0f,  0.0f,  1.0f,  0.0f,

		-0.5f, -0.5f, -0.5f,  0.0f, -1.0f,  0.0f,  0.0f,  1.0f,
		0.5f, -0.5f, -0.5f,  0.0f, -1.0f,  0.0f,  1.0f,  1.0f,
		0.5f, -0.5f,  0.5f,  0.0f, -1.0f,  0.0f,  1.0f,  0.0f,
		0.5f, -0.5f,  0.5f,  0.0f, -1.0f,  0.0f,  1.0f,  0.0f,
		-0.5f, -0.5f,  0.5f,  0.0f, -1.0f,  0.0f,  0.0f,  0.0f,
		-0.5f, -0.5f, -0.5f,  0.0f, -1.0f,  0.0f,  0.0f,  1.0f,

		-0.5f,  0.5f, -0.5f,  0.0f,  1.0f,  0.0f,  0.0f,  1.0f,
		0.5f,  0.5f, -0.5f,  0.0f,  1.0f,  0.0f,  1.0f,  1.0f,
		0.5f,  0.5f,  0.5f,  0.0f,  1.0f,  0.0f,  1.0f,  0.0f,
		0.5f,  0.5f,  0.5f,  0.0f,  1.0f,  0.0f,  1.0f,  0.0f,
		-0.5f,  0.5f,  0.5f,  0.0f,  1.0f,  0.0f,  0.0f,  0.0f,
		-0.5f,  0.5f, -0.5f,  0.0f,  1.0f,  0.0f,  0.0f,  1.0f
	};

	// positions all containers
	glm::vec3 cubePositions[] = {
		glm::vec3(0.0f,  0.0f,  0.0f),
		glm::vec3(2.0f,  5.0f, -15.0f),
		glm::vec3(-1.5f, -2.2f, -2.5f),
		glm::vec3(-3.8f, -2.0f, -12.3f),
		glm::vec3(2.4f, -0.4f, -3.5f),
		glm::vec3(-1.7f,  3.0f, -7.5f),
		glm::vec3(1.3f, -2.0f, -2.5f),
		glm::vec3(1.5f,  2.0f, -2.5f),
		glm::vec3(1.5f,  0.2f, -1.5f),
		glm::vec3(-1.3f,  1.0f, -1.5f)
	};

	glm::vec3 pointLightPositions[] = {
		glm::vec3(0.7f,  0.2f,  2.0f),
		glm::vec3(2.3f, -3.3f, -4.0f),
		glm::vec3(-4.0f,  2.0f, -12.0f),
		glm::vec3(0.0f,  0.0f, -3.0f)
	};

	unsigned int VAO, VBO;
	glGenVertexArrays(1, &VAO);
	glBindVertexArray(VAO);
	glGenBuffers(1, &VBO);
	glBindBuffer(GL_ARRAY_BUFFER, VBO);
	glBufferData(GL_ARRAY_BUFFER, sizeof(vertices), vertices, GL_STATIC_DRAW);
	glVertexAttribPointer(0, 3, GL_FLOAT, GL_FALSE, 8 * sizeof(float), (void*)0);
	glEnableVertexAttribArray(0);
	glVertexAttribPointer(1, 3, GL_FLOAT, GL_FALSE, 8 * sizeof(float), (void*)(3 * sizeof(float)));
	glEnableVertexAttribArray(1);
	glVertexAttribPointer(2, 2, GL_FLOAT, GL_FALSE, 8 * sizeof(float), (void*)(6 * sizeof(float)));
	glEnableVertexAttribArray(2);

	glm::mat4 model(1.0f);
	glm::mat4 view(1.0f);
	glm::mat4 projection(1.0);

	std::string vsPath = "./work/ShaderFile/Lightings/lamp/vertex.vs";
	std::string fsPath = "./work/ShaderFile/Lightings/lamp/fragment.fs";
	MyShader lampShader(vsPath.data(), fsPath.data());

	vsPath = "./work/ShaderFile/Lightings/toy/vertex.vs";
	fsPath = "./work/ShaderFile/Lightings/toy/fragment.fs";
	MyShader toyShader(vsPath.data(), fsPath.data());

	//循环函数
	//检查GLFW是否被要求退出
	while (!glfwWindowShouldClose(window))
	{
		//处理时间
		float currentFrame = glfwGetTime();
		deltaTime = currentFrame - lastFrame;
		lastFrame = currentFrame;

		//处理输入
		processInput(window);
		//设置清空屏幕颜色
		glClearColor(0.1f, 0.1f, 0.1f, 1.0f);
		//清除缓冲，这边的缓冲还有GL_DEPTH_BUFFER_BIT和GL_STENCIL_BUFFER_BIT
		glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);

		//着色器使用一次以后需要重新设置变量

		//先画物品
		toyShader.use();
		//激活纹理
		glActiveTexture(GL_TEXTURE0);
		glBindTexture(GL_TEXTURE_2D, texture_1);
		glUniform1i(glGetUniformLocation(toyShader.ID, "material.diffuse"), 0);
		glActiveTexture(GL_TEXTURE1);
		glBindTexture(GL_TEXTURE_2D, texture_2);
		glUniform1i(glGetUniformLocation(toyShader.ID, "material.specular"), 1);

		glUniform3f(glGetUniformLocation(toyShader.ID, "lightColor"), 1.0f, 1.0f, 1.0f);
		//反射光相关
		glUniform3f(glGetUniformLocation(toyShader.ID, "viewPos"), myCamera.Position.x, myCamera.Position.y, myCamera.Position.z);
		//glUniform3f(glGetUniformLocation(toyShader.ID, "material.specular"), 0.5f, 0.5f, 0.5f);
		glUniform1f(glGetUniformLocation(toyShader.ID, "material.shininess"), 32.0f);

		//平行光源
		glUniform3f(glGetUniformLocation(toyShader.ID, "dirLight.ambient"), 0.05f, 0.05f, 0.05f);
		glUniform3f(glGetUniformLocation(toyShader.ID, "dirLight.diffuse"), 0.4f, 0.4f, 0.4f);
		glUniform3f(glGetUniformLocation(toyShader.ID, "dirLight.specular"), 0.5f, 0.5f, 0.5f);
		glUniform3f(glGetUniformLocation(toyShader.ID, "dirLight.direction"), -0.2f, -1.0f, -0.3f);

		//点光源衰减系数
		glUniform3f(glGetUniformLocation(toyShader.ID, "pointLights[0].position"), pointLightPositions[0].x, pointLightPositions[0].y, pointLightPositions[0].z);
		glUniform3f(glGetUniformLocation(toyShader.ID, "pointLights[0].ambient"), 0.05f, 0.05f, 0.05f);
		glUniform3f(glGetUniformLocation(toyShader.ID, "pointLights[0].diffuse"), 0.8f, 0.8f, 0.8f);
		glUniform3f(glGetUniformLocation(toyShader.ID, "pointLights[0].specular"), 1.0f, 1.0f, 1.0f);
		glUniform1f(glGetUniformLocation(toyShader.ID, "pointLights[0].constant"), 1.0f);
		glUniform1f(glGetUniformLocation(toyShader.ID, "pointLights[0].linear"), 0.09);
		glUniform1f(glGetUniformLocation(toyShader.ID, "pointLights[0].quadratic"), 0.032);
		// Point light 2
		glUniform3f(glGetUniformLocation(toyShader.ID, "pointLights[1].position"), pointLightPositions[1].x, pointLightPositions[1].y, pointLightPositions[1].z);
		glUniform3f(glGetUniformLocation(toyShader.ID, "pointLights[1].ambient"), 0.05f, 0.05f, 0.05f);
		glUniform3f(glGetUniformLocation(toyShader.ID, "pointLights[1].diffuse"), 0.8f, 0.8f, 0.8f);
		glUniform3f(glGetUniformLocation(toyShader.ID, "pointLights[1].specular"), 1.0f, 1.0f, 1.0f);
		glUniform1f(glGetUniformLocation(toyShader.ID, "pointLights[1].constant"), 1.0f);
		glUniform1f(glGetUniformLocation(toyShader.ID, "pointLights[1].linear"), 0.09);
		glUniform1f(glGetUniformLocation(toyShader.ID, "pointLights[1].quadratic"), 0.032);
		// Point light 3
		glUniform3f(glGetUniformLocation(toyShader.ID, "pointLights[2].position"), pointLightPositions[2].x, pointLightPositions[2].y, pointLightPositions[2].z);
		glUniform3f(glGetUniformLocation(toyShader.ID, "pointLights[2].ambient"), 0.05f, 0.05f, 0.05f);
		glUniform3f(glGetUniformLocation(toyShader.ID, "pointLights[2].diffuse"), 0.8f, 0.8f, 0.8f);
		glUniform3f(glGetUniformLocation(toyShader.ID, "pointLights[2].specular"), 1.0f, 1.0f, 1.0f);
		glUniform1f(glGetUniformLocation(toyShader.ID, "pointLights[2].constant"), 1.0f);
		glUniform1f(glGetUniformLocation(toyShader.ID, "pointLights[2].linear"), 0.09);
		glUniform1f(glGetUniformLocation(toyShader.ID, "pointLights[2].quadratic"), 0.032);
		// Point light 4
		glUniform3f(glGetUniformLocation(toyShader.ID, "pointLights[3].position"), pointLightPositions[3].x, pointLightPositions[3].y, pointLightPositions[3].z);
		glUniform3f(glGetUniformLocation(toyShader.ID, "pointLights[3].ambient"), 0.05f, 0.05f, 0.05f);
		glUniform3f(glGetUniformLocation(toyShader.ID, "pointLights[3].diffuse"), 0.8f, 0.8f, 0.8f);
		glUniform3f(glGetUniformLocation(toyShader.ID, "pointLights[3].specular"), 1.0f, 1.0f, 1.0f);
		glUniform1f(glGetUniformLocation(toyShader.ID, "pointLights[3].constant"), 1.0f);
		glUniform1f(glGetUniformLocation(toyShader.ID, "pointLights[3].linear"), 0.09);
		glUniform1f(glGetUniformLocation(toyShader.ID, "pointLights[3].quadratic"), 0.032);

		//聚光光源
		glUniform3f(glGetUniformLocation(toyShader.ID, "spotLight.position"), myCamera.Position.x, myCamera.Position.y, myCamera.Position.z);
		glUniform3f(glGetUniformLocation(toyShader.ID, "spotLight.direction"), myCamera.Front.x, myCamera.Front.y, myCamera.Front.z);
		glUniform3f(glGetUniformLocation(toyShader.ID, "spotLight.ambient"), 0.0f, 0.0f, 0.0f);
		glUniform3f(glGetUniformLocation(toyShader.ID, "spotLight.diffuse"), 1.0f, 1.0f, 1.0f);
		glUniform3f(glGetUniformLocation(toyShader.ID, "spotLight.specular"), 1.0f, 1.0f, 1.0f);
		glUniform1f(glGetUniformLocation(toyShader.ID, "spotLight.constant"), 1.0f);
		glUniform1f(glGetUniformLocation(toyShader.ID, "spotLight.linear"), 0.09);
		glUniform1f(glGetUniformLocation(toyShader.ID, "spotLight.quadratic"), 0.032);
		glUniform1f(glGetUniformLocation(toyShader.ID, "spotLight.cutOff"), glm::cos(glm::radians(12.5f)));
		glUniform1f(glGetUniformLocation(toyShader.ID, "spotLight.outerCutOff"), glm::cos(glm::radians(15.0f)));

		model = glm::mat4(1.0f);
		//glUniformMatrix4fv(glGetUniformLocation(toyShader.ID, "model"), 1, GL_FALSE, glm::value_ptr(model));
		glUniformMatrix4fv(glGetUniformLocation(toyShader.ID, "view"), 1, GL_FALSE, glm::value_ptr(myCamera.GetViewMatrix()));
		projection = glm::perspective(glm::radians(myCamera.Zoom), 800.0f / 600.0f, 0.1f, 100.0f);
		glUniformMatrix4fv(glGetUniformLocation(toyShader.ID, "projection"), 1, GL_FALSE, glm::value_ptr(projection));

		for (unsigned int i = 0; i < 10; i++)
		{
			// calculate the model matrix for each object and pass it to shader before drawing
			glm::mat4 model;
			model = glm::translate(model, cubePositions[i]);
			float angle = 20.0f * i;
			model = glm::rotate(model, glm::radians(angle), glm::vec3(1.0f, 0.3f, 0.5f));
			glUniformMatrix4fv(glGetUniformLocation(toyShader.ID, "model"), 1, GL_FALSE, glm::value_ptr(model));
			glDrawArrays(GL_TRIANGLES, 0, 36);
		}

		//再画灯
		lampShader.use();
		glUniform3f(glGetUniformLocation(lampShader.ID, "lightColor"), 1.0f, 1.0f, 1.0f);
		model = glm::mat4(1.0f);
		model = glm::translate(model, glm::vec3(1.2f, 1.0f, 2.0f));
		model = glm::scale(model, glm::vec3(0.2f)); // a smaller cube
		glUniformMatrix4fv(glGetUniformLocation(lampShader.ID, "model"), 1, GL_FALSE, glm::value_ptr(model));
		glUniformMatrix4fv(glGetUniformLocation(lampShader.ID, "view"), 1, GL_FALSE, glm::value_ptr(myCamera.GetViewMatrix()));
		projection = glm::perspective(glm::radians(myCamera.Zoom), 800.0f / 600.0f, 0.1f, 100.0f);
		glUniformMatrix4fv(glGetUniformLocation(lampShader.ID, "projection"), 1, GL_FALSE, glm::value_ptr(projection));
		for (unsigned int i = 0; i < 4; i++)
		{
			model = glm::mat4();
			model = glm::translate(model, pointLightPositions[i]);
			model = glm::scale(model, glm::vec3(0.2f)); // Make it a smaller cube
			glUniformMatrix4fv(glGetUniformLocation(lampShader.ID, "model"), 1, GL_FALSE, glm::value_ptr(model));
			glDrawArrays(GL_TRIANGLES, 0, 36);
		}

		//交换颜色缓冲
		glfwSwapBuffers(window);
		//检测有没有触发事件（键盘输入、鼠标移动）
		glfwPollEvents();
	}

	glDeleteVertexArrays(1, &VAO);
	glDeleteBuffers(1, &VBO);

	closeWindow();
	return 0;
}
